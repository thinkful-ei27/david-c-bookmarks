'use strict';
/* global $ */

const api = (function () {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/davidc';
  
  const getItems = function (callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);

  };

  const createItem = function(item, successCallback, errorCallback){
    const newItem = JSON.stringify(
      item


    );

    $.ajax(
      {
        url: `${BASE_URL}/bookmarks`,
        method: 'POST',
        contentType: 'application/json',
        data: newItem,
        success: successCallback,
        error: errorCallback,
      }
    );
  };

  const updateItem = function(id, updateData, callback){
    $.ajax(
      {
        url: `${BASE_URL}/bookmarks/${id}`,
        method: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(updateData),
        success: callback,
      }
    );
  
  };

  const deleteItem = function(id, callback){
    $.ajax(
      {
        url: `${BASE_URL}/bookmarks/${id}`,
        method: 'DELETE',
        contentType: 'application/json',
        data: deleteItem,
        success: callback,
      }
    );
  
  };

  const errorMessage = function(){
     console.log(`invalid ${store.error}`);
  };

  return {
    getItems,
    createItem,
    updateItem,
    deleteItem,
    errorMessage,
  };

}());