/* eslint-disable strict */
/* global Item */

// eslint-disable-next-line no-unused-vars
const store = (function(){
    const addItem = function(item) {
      Object.assign(item, {expanded: false});
      this.items.push(item);
    };
  
    const findById = function(id) {
      return this.items.find(item => item.id === id);
    };
  
    const findAndDelete = function(id) {
      this.items = this.items.filter(item => item.id !== id);
    };
  
    const toggleFilter = function() {
      
      store.ratingFilter = $('select').val();
    };
    
    const toggleExpanded = function(id) {
      let item = this.findById(id);
      item.expanded = !item.expanded; 
    };

    const findAndUpdate = function (id, newData) {
      const foundItem = this.findById(id);
      return Object.assign(foundItem, newData);
    };
  
    return {
      items: [],
      ratingFilter: null,
      error: '',
  
      addItem,
      findById,
      findAndDelete,
      toggleFilter,
      toggleExpanded,
    //   setItemIsEditing,
      findAndUpdate,
    };
    
    
  }());