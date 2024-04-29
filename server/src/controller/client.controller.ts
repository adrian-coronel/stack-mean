import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../db/database";

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await collections?.clients?.find({}).toArray();
    res.status(200).send(clients);
  }
  catch (error) {
    res.status(500).send(error instanceof Error ? error.message : "Unknown error");
  }
}

export const getClientById = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) }; // convertimos el id de string a objeto de mongodb
    const client = await collections?.clients?.findOne(query);

    if (client) 
      res.status(200).send(client);
    else 
      res.status(404).send(`Failed to find an client: ID ${id}`);
    
  } catch (error) {
    res.status(404).send(`Failed to find an client: ID ${req?.params?.id}`);
  }
}

export const saveClient = async (req: Request, res: Response) => {
  try {
      const client = req.body;
      const result = await collections?.clients?.insertOne(client);

      // Indica si este resultado de escritura fue reconocido. De lo contrario, 
      // todos los demás miembros de este resultado serán indefinidos.
      if (result?.acknowledged) {
          res.status(201).send(`Created a new client: ID ${result.insertedId}.`);
      } else {
          res.status(500).send("Failed to create a new client.");
      }
  } catch (error) {
      console.error(error);
      res.status(400).send(error instanceof Error ? error.message : "Unknown error");
  }
}

export const updateClient = async (req: Request, res: Response) => {
  try {
      const id = req?.params?.id;
      const client = req.body;
      const query = { _id: new ObjectId(id) };
      const result = await collections?.clients?.updateOne(query, { $set: client });

      // matchedCount: El número de documentos que coincidieron con el filtro.
      if (result && result.matchedCount) {
          res.status(200).send(`Updated an client: ID ${id}.`);
      } else if (!result?.matchedCount) {
          res.status(404).send(`Failed to find an client: ID ${id}`);
      } else {
          res.status(304).send(`Failed to update an client: ID ${id}`);
      }
  } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error(message);
      res.status(400).send(message);
  }
}

export const deleteClient = async (req: Request, res: Response) => {
  try {
      const id = req?.params?.id;
      const query = { _id: new ObjectId(id) };
      const result = await collections?.clients?.deleteOne(query);

      // deleteCount: El número de documentos que se eliminaron.
      if (result && result.deletedCount) 
        res.status(202).send(`Removed an client: ID ${id}`);
      else if (!result) 
        res.status(400).send(`Failed to remove an client: ID ${id}`);
      else if (!result.deletedCount) 
        res.status(404).send(`Failed to find an client: ID ${id}`);
      
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
}