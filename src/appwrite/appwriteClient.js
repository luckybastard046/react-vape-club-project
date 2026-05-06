import React, { useState, useEffect } from "react";
import {
  Client,
  Databases,
  Teams,
  Storage,
  ID,
  Account,
  Query,
  Avatars,
  Graphql,
} from "appwrite";

const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1')  // Endpoint URL
  .setProject('69ec27520003a6139dde')  // Project ID
  

const databases = new Databases(client);
const storage = new Storage(client);
const account = new Account(client);
const avatars = new Avatars(client);
const teams = new Teams(client);
const graphql = new Graphql(client);

async function addUserToRole(teamId, userId) {
    try {
        await teams.createMembership(teamId, userId, ['member'], 'https://your-redirect-url.com');
        console.log("User added to role/team successfully");
    } catch (err) {
        console.error("Error adding user to role:", err);
    }
}

async function getUserRoles(userId) {
    try {
        const memberships = await teams.list();
        const userTeams = memberships.teams.filter(team => 
            team.memberships.some(m => m.userId === userId)
        );
        return userTeams.map(team => team.name);
    } catch (err) {
        console.error("Error fetching roles:", err);
        return [];
    }
}

export { 
    client, 
    databases, 
    storage, 
    account, 
    avatars, 
    teams, 
    ID, 
    Query,
    graphql,
}