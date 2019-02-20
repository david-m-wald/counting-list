app.directive("listManager", ["$compile", "$window", function($compile, $window) {
  return {
    templateUrl: "./app/templates/listManager.html",
    controllerAs: "$ctrl",
    controller: ["$scope", "$document", function($scope, $document) {

      let listMaster = $scope.listMaster = []; //array of item list scopes
      let activeList;                          //currently selected item list scope
      this.saveIndex = 0;                      //index of saved list
      this.nextList = 0;                       //list number of next list to be added

      //Scope method to add new list
      this.addList = function(list) {
        list.listIndex = this.nextList++; //set local list index for re-order purposes
        listMaster.push(list);
        this.selectList(list);
      };

      //Scope method to select list when clicking navigation tab or adding list
      this.selectList = function(list) {
        if (activeList != null) activeList.selected = false;
        activeList = list;
        list.selected = true;
        list.closeEditItemFields();
        list.closeEditListFields();
        list.closeSortOptions();
        this.hideListInput();

        markActiveList(activeList.listName);

        this.saveData();
      };

      //Scope method to select stored active list when initializing app
      this.selectStoredActiveList = function() {
        let loadActiveListName = angular.fromJson($window.localStorage.getItem('loadActiveList'));
        angular.forEach(listMaster, function(iList) {
          if (iList.listName == loadActiveListName)
            this.selectList(iList);
        }, this);

        markActiveList(loadActiveListName);
      };

      //Scope method to display input for new list
      this.showListInput = function(list) {
        $scope.listInputDisplay = true;
        if (activeList != null) {
          activeList.closeEditItemFields();
          activeList.closeEditListFields();
          activeList.closeSortOptions();
        }
      };

      //Scope method to hide input for new list
      this.hideListInput = function() {
        $scope.inputListName = undefined;
        $scope.listInputDisplay = false;
      };

      //Scope method to check for duplicate list name
      this.isDuplicateList = function(currentList, name) {
        let duplicate = false;
        angular.forEach(listMaster, function(iList) {
          if (iList != currentList && name == iList.listName) {
            $window.alert("Duplicate list! Try again.");
            duplicate = true;
          }
        });
        return duplicate;
      };

      //Scope method to save list names, list items, list sort order, and active list name to local storage
      this.saveData = function() {
        let storeLists = []; //array of stored item lists
        angular.forEach(listMaster, function(iList) {
          storeLists.push({
            listName: iList.listName,
            items: iList.items,
            order: iList.order
          });
        });
        $window.localStorage.setItem('saveData', angular.toJson(storeLists));
        $window.localStorage.setItem('saveActiveList', angular.toJson(activeList.listName));
      };

      //Function to mark navigation tab as "active" (and deactivate other tabs)
      function markActiveList(listName) {
        $document.ready(function() {
          let navItems = $document.find("#navigation li a");
          angular.forEach(navItems, function(navItem) {
            if (angular.element(navItem).text() == listName) {
              angular.element(navItem).parent().addClass("active");
              angular.element(navItem).parent().siblings().removeClass("active");
            }
          });
        });
      }

    }],

    link: function(scope, element, attrs, ctrl) {

      let beginElements = 1; //number of child elements preceding list-item elements
      let listMaster = scope.listMaster;

      //Scope method to create new list - checks for non-duplicate name
      scope.createList = function(name) {
        if (angular.isUndefined(name) || name == "") {
          $window.alert("Enter a list name!");
        } else if (!ctrl.isDuplicateList(null, name)) {
            let newList = `<item-list list-name="${name}" list-number="${ctrl.saveIndex++}"></item-list>`;
            element.append($compile(newList)(scope));
            scope.inputListName = undefined; //clear input
        };
      };

      //Scope method to delete list - selects alphabetically first list on delete
      ctrl.deleteList = function(list) {
        list.$destroy();
        element.children()[beginElements + list.listIndex].remove();
        listMaster.splice(list.listIndex, 1);
        reorderLists();
        scope.$watch(scope.sortedListMaster, () => ctrl.selectList(scope.sortedListMaster[0]));
        this.saveData();
      };

      //Scope method to load saved lists upon app initialization
      scope.loadLists = function() {
        let data = angular.fromJson($window.localStorage.getItem('loadData'));
        angular.forEach(data, function(iList) {
          scope.createList(iList.listName);
        });
      };

      //Function to reorder lists when a list is deleted
      function reorderLists() {
        let listCount = 0;
        angular.forEach(listMaster, function(iList) {
          iList.listIndex = listCount++;
        });
        ctrl.nextList = listCount;
      }


      //Executable code upon creation of directive

      //On application start, load any saved data to a new location in local storage and load lists
      if ($window.localStorage.getItem('saveData')) {
        $window.localStorage.setItem('loadData', $window.localStorage.getItem('saveData'));
        $window.localStorage.setItem('loadActiveList', $window.localStorage.getItem('saveActiveList'));
        scope.loadLists();
      }

    }
  };
}]);