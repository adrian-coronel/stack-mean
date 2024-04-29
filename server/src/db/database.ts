import * as mongodb from "mongodb";
import { Client } from "../model/client";


export const collections: {
  clients?: mongodb.Collection<Client>;
} = {};

/**
 * Función asincrónica para conectar con la base de datos MongoDB.
 * @param uri La URI de conexión a la base de datos.
 */
export async function connectToDatabase(uri: string) {
  
  // Creamos una nueva instancia de MongoClient utilizando la URI proporcionada
  const client = new mongodb.MongoClient(uri);
  
  // Conectamos con el servidor de MongoDB utilizando el cliente
  await client.connect();

  // Obtenemos una referencia a la base de datos "mean-stack" a partir del cliente
  const db = client.db("mean-stack");
  
  // Aplicamos la validación de esquema a la base de datos
  await applySchemaValidation(db);

  // Obtenemos una referencia a la colección "clients" dentro de la base de datos
  const clientsCollection = db.collection<Client>("clients");
  
  // Almacenamos la referencia a la colección en un objeto global llamado "collections"
  collections.clients = clientsCollection;
}


// Actualice nuestra colección existente con la validación del esquema JSON para que sepamos que nuestros documentos siempre coincidirán con la forma de nuestro modelo de Empleado, incluso si se agregan en otro lugar.
// Para obtener más información sobre la validación de esquemas, consulte esta serie de blogs:z https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) { // La clase Db es una clase que representa una base de datos MongoDB.
  const jsonSchema = {
    // Define el esquema JSON utilizando la sintaxis $jsonSchema
    $jsonSchema: {
      // Especifica que el documento debe ser de tipo objeto
      bsonType: "object",
      // Define las propiedades obligatorias que deben estar presentes en el documento
      required: ["name", "lastname", "dni", "phone"],
      // Indica que no se permiten propiedades adicionales que no estén definidas en el esquema
      additionalProperties: false,
      // Define las propiedades del documento junto con sus restricciones
      properties: {
        _id: {},
        name: {
            bsonType: "string",
            description: "'name' is required and is a string",
            minLength: 80
        },
        lastname: {
            bsonType: "string",
            description: "'lastname' is required and is a string",
            minLength: 80
        },
        dni: {
            bsonType: "string",
            description: "'dni' is required and is a string",
            minLength: 8
        },
        phone: {
            bsonType: "string",
            description: "'phone' is required and is a string",
            minLength: 9
        },
      },
    },
  };

  // Intenta aplicar la modificación a la colección, si la colección no existe, créala
  await db.command({
      collMod: "clients",
      validator: jsonSchema
  }).catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
          await db.createCollection("clients", {validator: jsonSchema});
      }
  });
}