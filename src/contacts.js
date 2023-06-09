import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

// this will be translated to an API backend call of
//  GET backend/api/contacts?q="something"
export async function getContacts(query) {
  query ??= "";
  const response = await fetch(
    `http://localhost:4000/api/contacts?q=${encodeURIComponent(query)}`
  );
  const contacts = await response.json();
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  let id = Math.random().toString(36).substring(2, 9);
  const response = await fetch(`http://localhost:4000/api/contacts/${id}`, {
    method: "POST",
  });
  const contact = await response.json();
  return contact ?? null;
}

export async function getContact(id) {
  id ??= "";
  const response = await fetch(`http://localhost:4000/api/contacts/${id}`);
  const contact = await response.json();
  return contact ?? null;
}

export async function updateContact(id, updates) {
  id ??= "";
  updates ??= {};

  const response = await fetch(
    `http://localhost:4000/api/contacts/${id}?updates=${encodeURIComponent(
      JSON.stringify(updates)
    )}`,
    { method: "PUT" }
  );
  const contact = await response.json();
  return contact ?? null;
}

export async function deleteContact(id) {
  id ??= "";

  const response = await fetch(
    `http://localhost:4000/api/contacts/${id}`,
    { method: "DELETE" }
  );
  const contact = await response.json();
  return contact ?? false;
}

function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
