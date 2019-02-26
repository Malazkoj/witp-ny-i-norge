/*
 This file contains utils functions to be used on the server side
  (typically called by `app.js`)
 */

const someResources = [{id:1, content: "resource1"}, {id:3, content: "resource2"}];

// This is just an example to make the tests pass
export function getResourceById(id) {
    return someResources.find(resource => resource.id === id);
}
