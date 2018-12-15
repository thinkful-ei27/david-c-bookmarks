/* eslint-disable strict */
/* global store, $, api */

// eslint-disable-next-line no-unused-vars
// Number("1")
const bookmarkList = (function(){
    

    function generateAddItemForm(){
        $('#add').click( event => {
            event.preventDefault();
            $('.js-create-form').html(
            `<label for="bookmark-list-entry">Title</label>
            <input type="text" name="bookmark-list-entry" class="js-bookmark-title-entry">
            <label for="bookmark-link-entry">Link</label>
            <input type="url" name="bookmark-link-entry" class="js-bookmark-link-entry">
            <label for="rating-entry">Rating</label>
            <input id="rating" type="number" name="rating-entry" class="js-bookmark-rating-entry" min='1' max='5'>
            <label for="description" >Description</label>
            <input id="description" type="text" name="description" class="js-bookmark-description-entry">
            <label for="add-bookmark" >Add Bookmark</label>
            <button id= "addition" type="submit">Submit</button>
            `
            );
            render();
        });
    };

    function dropdown(){
        $("#filter").click(event => {
            event.preventDefault();
            $("#dropdown").toggleClass("show");
        });
    };

    function generateBookmarkTitleString(bookmarkList) {
        const items = bookmarkList.map((item) => generateItemElement(item));
        return items.join('');
    };
      
      
    function render() {
        // filter needs to be adjusted for rating 1-5
        const itemtemp = [ ...store.items];
        if (store.ratingFilter !== null){
            items = itemtemp.filter(item => (item.rating >= store.ratingFilter));
        }
        else {
            items = itemtemp;
        }
        console.log(items);

        
      
      
        // render the shopping list in the DOM
        console.log('`render` ran');
        const bookmarkListItemsString = generateBookmarkTitleString(items);
      
        // insert that HTML into the DOM
        $('.js-bookmark-list').html(bookmarkListItemsString);
    };

   function handleAddition(){
    $('.js-create-form').submit(function (event) {
        console.log('form submitted');
        event.preventDefault();
        const newItemTitle = $(".js-bookmark-title-entry").val();
        const newItemLink = $('.js-bookmark-link-entry').val();
        const newItemRating = $('.js-bookmark-rating-entry').val();
        // get values of all form inputs
        let newItem = {title: newItemTitle, url: newItemLink, rating: newItemRating};
        console.log(newItem);
        $('.js-bookmark-list-entry').val('');
        api.createItem(newItem, (result) => {
          store.addItem(result);
          render(); 
        }, (error)=> alert(error.responseJSON.message));
      });
      
    };
   

   function generateItemElement(item){
        let itemDesc = item.expanded ? `<div class="column"> ${item.desc} </div>` : '';
        let itemLink = item.expanded ? `<div class="column"> ${item.url} </div>` : '';
        console.log(itemDesc);
       return `
       <div class="${item.id}" class='row'>
        <div class= 'column'>${item.title}</div> 
        ${itemLink}
        <div class= 'column'>Rating: ${item.rating}</div>
        ${itemDesc}
        <label for="expanded-view"></label>
        <button name= "expanded-view" class= 'expand' data-item-index="${item.id}" type="button">Expand</button>
        <label for="deletion"></label>
        <button name= "deletion" class= 'delete' type="button">Delete</button>
       </div>`
       ;
       
   };



   function handleDelete() {
    $(".js-bookmark-list").on('click', ".delete",  event => {
    event.preventDefault();
    let itemToDelete = $(event.target).parent().attr('class');
    api.deleteItem(itemToDelete);
    store.findAndDelete(itemToDelete);
    render(); 

    console.log(store.items);
    });
    render();
    
};

   function dropdown(){
    $("#filter").click(event => {
        event.preventDefault();
        $("#dropdown").toggleClass("show");
    });
};
function handlesExpandButton(){
    
    $(".js-bookmark-list").on('click', ".expand",  event => {
        event.preventDefault();
        let id = $(event.target).data('item-index');
        console.log(id);
        store.toggleExpanded(id);
        render();
        // if (store.item.expanded){
        // item.push(newItemDescription);
        // };
    });
};

function handleFilter() {
    $("#filter").click( event => {
    event.preventDefault();
    store.toggleFilter();
    render();
    console.log(store.ratingFilter);
    });
    render();
    console.log(items);
};


    
    function bindEventListeners() {
        handleDelete();
        generateAddItemForm();
        handleAddition();
        handlesExpandButton();
        handleFilter();
        dropdown();
  
    };
    
  
    return {
      render: render,
      bindEventListeners: bindEventListeners,
    };
  
}());
  