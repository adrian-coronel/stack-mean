import * as mongodb from "mongodb";

/**
 * Interfaz que representa un cliente en la base de datos.
 */
export interface Client {
  _id?: mongodb.ObjectId; // ObjectId generado por mongodb
  name: string;
  lastname: string;
  dni: string;
  phone: string;
}