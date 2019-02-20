app.directive("itemList", ["$window", "$document", function($window, $document) {
  return {
    require: "^^listManager",
    templateUrl: "./app/templates/itemList.html",
    scope: {
      listName: "@",
      listNumber: "@"
    },
    link: function(scope, element, attrs, managerCtrl) {

      let items = scope.items = [];         //array storing items of list (in input order)     
      scope.nextItem = 0;                   //item number of next item to be added
      scope.listEditable = false;           //toggle to display list edit options
      scope.displaySortOptions = false;     //toggle to display item sort options
      scope.inputItemQuantity = 1;          //set default quantity for new item
      scope.editListName = scope.listName;  //set default editable list name
      scope.orderOptions = [                //item sort options
        {
          index: 0,
          display: "Original",
          type: "index"
        },
        {
          index: 1,
          display: "Item Name (a-z)",
          type: "itemName"
        },
        {
          index: 2,
          display: "Item Name (z-a)",
          type: "-itemName"
        },
        {
          index: 3,
          display: "Quantity (Low to High)",
          type: ["quantity", "itemName"]
        },
        {
          index: 4,
          display: "Quantity (High to Low)",
          type: ["-quantity", "itemName"]
        }
      ];
      scope.order = scope.orderOptions[0];  //set default sort option to input order

      //Scope method to add new item to list - checks for non-duplicate name and positive, integral quantity
      scope.addItem = function(name, quantity) {
        managerCtrl.hideListInput();
        scope.closeEditListFields();
        scope.listEditable = false;
        scope.closeEditItemFields();

        let intQuantity = parseInt(quantity);

        if (angular.isUndefined(name) || name == "") {
          $window.alert("Enter an item name!");
        } else if (!isFinite(intQuantity) || intQuantity <= 0 || quantity > intQuantity) {
          $window.alert("Invalid quantity!");
        } else if (!scope.isDuplicateItem(null, name, intQuantity)) {
          let newItem = {
            itemName: name,
            listName: scope.listName,
            index: scope.nextItem++,
            quantity: intQuantity,
            editable: false,
            editName: name,
            editQuantity: intQuantity
          };
          items.push(newItem);
          scope.scrollToItem(newItem);

          scope.inputItemName = undefined; //clear input
          scope.inputItemQuantity = 1;     //resets input to default
          managerCtrl.saveData();
        }
      };

      //Scope method to handle duplicate item
      scope.isDuplicateItem = function(currentItem, name, quantity) {
        let duplicate = false;
        angular.forEach(items, function(item) {
          if (item != currentItem && name == item.itemName) {
            if ($window.confirm("Duplicate item!\nMerge quantity to existing?")) {
              scope.mergeQuantity(item, quantity);
              if (currentItem != null) scope.deleteItem(currentItem.index); //for existing item
              scope.inputItemName = undefined; //clear input
              scope.scrollToItem(item);
            }
            duplicate = true;
          }
        });
        return duplicate;
      };

      //Scope method to merge quantity for a duplicated item
      scope.mergeQuantity = function(item, addQuantity) {
        item.quantity += addQuantity;
        scope.resetItemEdit(item);
        managerCtrl.saveData();
      };

      //Scope method to handle clicking +/- quantity change buttons
      scope.changeQuantity = function(item, change) {
        let intEditQuantity = parseInt(item.editQuantity);
        if (!isFinite(intEditQuantity) || intEditQuantity < 0) intEditQuantity = 0;
        item.editQuantity = intEditQuantity += change;
        if (item.editQuantity < 0) item.editQuantity = 0;
      };

      //Scope method to enable item editing
      scope.editItem = function(item) {
        managerCtrl.hideListInput();
        scope.closeEditItemFields();
        scope.closeEditListFields();
        scope.currentEditItem = item;
        item.editable = true;
      };

      //Scope method to process edited item - checks for non-duplicate name and positive, integral quantity
      scope.updateItem = function(item) {
        let intEditQuantity = parseInt(item.editQuantity);
        if (item.editName == "")
          $window.alert("Enter an item name!");
        else if (!isFinite(intEditQuantity) || intEditQuantity < 0 || item.editQuantity > intEditQuantity)
          $window.alert("Invalid quantity!");
        else if (!scope.isDuplicateItem(item, item.editName, intEditQuantity)) {
          item.itemName = item.editName;
          item.quantity = intEditQuantity;
          item.editable = false;
          if (item.quantity == 0) scope.deleteItem(item.index);
          managerCtrl.saveData();
        }
      };

      //Scope method to reset item edit fields
      scope.resetItemEdit = function(item) {
        item.editName = item.itemName;
        item.editQuantity = item.quantity;
      };

      //Scope method to delete list item
      scope.deleteItem = function(itemIndex) {
        managerCtrl.hideListInput();
        scope.closeEditItemFields();
        scope.closeEditListFields();
        items.splice(itemIndex, 1);
        reorderItems();
        managerCtrl.saveData();
      };

      //Scope method to enable editing list information
      scope.editList = function() {
        managerCtrl.hideListInput();
        scope.closeEditItemFields();
        scope.listEditable = true;
        if (scope.displaySortOptions) scope.toggleSortOptions();
      };

      //Scope method to process edited list information - checks for duplicate name
      scope.updateList = function() {
        if (scope.editListName == "")
          $window.alert("Enter a list name!");
        else if (!managerCtrl.isDuplicateList(scope, scope.editListName)) {
          scope.listName = scope.editListName;
          scope.listEditable = false;
          managerCtrl.selectList(scope);
        }
      };

      //Scope method to reset list edit fields
      scope.resetListEdit = function() {
        scope.editListName = scope.listName
      };

      //Scope method to delete list with confirmation
      scope.deleteList = function() {
        if ($window.confirm("Delete list?")) managerCtrl.deleteList(scope);
      };

      //Scope method to toggle open/close of item sort option menu
      scope.toggleSortOptions = function() {
        managerCtrl.hideListInput();
        scope.displaySortOptions = !scope.displaySortOptions;
      };

      //Scope method to close item sort option menu
      scope.closeSortOptions = function() {
        scope.displaySortOptions = false;
      };

      //Scope method to handle changing sort option
      scope.changeOption = function() {
        managerCtrl.saveData();
      };

      //Scope method to close and reset editable fields for current editable item
      scope.closeEditItemFields = function() {
        if (scope.currentEditItem != null) {
          scope.resetItemEdit(scope.currentEditItem);
          scope.currentEditItem.editable = false;
        }
      };

      //Scope method to close and reset editable fields for current list
      scope.closeEditListFields = function() {
        scope.listEditable = false;
        scope.resetListEdit();
      };

      //Function to reorder items in list when an item is deleted
      function reorderItems() {
        let itemCount = 0;
        angular.forEach(items, function(nItem) {
          nItem.index = itemCount++;
        });
        scope.nextItem = itemCount;
      }

       //Scope method to scroll to item display within visible portion of window below navigation bar
       scope.scrollToItem = function(item) {
        $document.ready(function() {
         let displayItems = element.find(".item-display");
         displayItems.text(function(index, value) {
           if(value == item.itemName)
           {
             let tableCell = displayItems.eq(index).parent().parent()[0];
             let navBar = $("#navigation")[0];
             tableCell.scrollIntoView();

             //Offset scroll if item display is covered by fixed navigation bar
             if (tableCell.getBoundingClientRect().top < navBar.getBoundingClientRect().bottom)
               $window.scrollBy(0, tableCell.getBoundingClientRect().top - navBar.getBoundingClientRect().bottom);
           }
         });
       });
     };
     
      //Scope method to load saved list items upon app initialization
      scope.loadItems = function() {
        let data = angular.fromJson($window.localStorage.getItem('loadData'));
        let list = data[parseInt(scope.listNumber)];
        if (list != undefined) {
          angular.forEach(list.items, function(item) {
            scope.addItem(item.itemName, parseInt(item.quantity));
          });
          scope.order = scope.orderOptions[parseInt(list.order.index)]; //apply saved sort order option
          managerCtrl.selectStoredActiveList(); //stored active list is selected once all items have been loaded
        }
      };


      //Executable code upon creation of directive
      managerCtrl.addList(scope);

      if ($window.localStorage.getItem('loadData')) {
        scope.loadItems();
        $document.ready(function() {
          $window.scrollTo(0, 0);
        });
      }

    }
  };
}]);