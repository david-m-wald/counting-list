# Counting List

#### Counting list app using AngularJS

<p align="center"><img src="https://imgur.com/DdFpq3A.gif" width=400></p>

See a live version of the app [here](https://davidmwald.github.io/counting-list/).

## Languages, Libraries, and Frameworks

- JavaScript
  - AngularJS
  - JQuery
- Bootstrap
- HTML
- CSS

## Features

- Permits creation, deletion, and renaming of sub-lists/categories to store items and quantities
- Allows for adding new items and quantities, deleting items, renaming items, and updating quantities within each sub-list/category
- Provides sorting options for items in each sub-list/category
- Provides user input validation and activity confirmation including when deleting an entire sub-list/category or when attempting to add a duplicate sub-list/category or item
- Auto-sorted navigation bar for sub-lists/categories
- Local browser storage to save all sub-lists/categories, items, and sorting options
- Bootstrap layout with tooltips
- Mouse-enabled

## Installation

The code can be acquired by forking/cloning this repository or from the latest release. The application can be independently opened and used in a web browser via the index.html file or accessed via the hosted live version [here](https://davidmwald.github.io/counting-list/).

## Usage

The app currently supports a single master list which is a collection of sub-lists/categories of items and quantities. The sub-lists/categories may be related or unrelated. Support for multiple master lists will likely be added in the future.

All sub-lists/categories, items and quantities, and sorting options are actively saved to the browser's cache and are automatically retrieved if the browser is refreshed or closed and re-opened. Clearing the browser's cache will result in a loss of all content.

Hover over buttons for tooltips to get assistance.

#### Adding New Sub-Lists/Categories and Navigation

Click the + button on the navigation bar at the top of the app to open the list addition input menu. To add a sub-list/category, type a name in the text box and click on the green add button. The addition will be unsuccessful and the user will be warned if a name is not provided or if the provided name is a duplicate of an existing sub-list/category name. Upon success, the list addition menu will close, the sub-list/category will automatically open, and a new tab will be added in alphabetical order to the navigation bar. Each new sub-list/category is created with a title, option buttons, and an item addition menu (see more below). At any time, the list addition menu can be closed by clicking on the red cancel button. The menu will also generally close automatically when performing other actions such as changing or editing sub-lists/categories or adding/editing/deleting items. 

To change the sub-list/category being used, click on the desired tab in the navigation bar. The tab for the active sub-list/category will be highlighted.

<p align="center"><img src="https://imgur.com/w5DDMVg.png" width=300><img src="https://imgur.com/nJGCGZo.png" width=300></p>

#### Renaming and Deleting Sub-Lists/Categories

When using a particular sub-list/category, click on the orange edit button below the sub-list/category title to open the list edit menu.

To rename the sub-list/category, type a new name in the text box (which defaults to the original name) and click on the green update button. The renaming will be unsuccessful and the user will be warned if a name is not provided or if the provided name is a duplicate of another sub-list/category name. Upon success, the list edit menu will close, the navigation bar will be updated, and the sub-list/category title will be updated. 

Prior to updating the name, the user can click on the orange reset button to reset the text box to contain the original name.

To delete a sub-list/category, click on the red delete button. The user will be prompted to confirm the deletion. When a sub-list/category is deleted, the associated tab will be removed from the navigation bar, the list edit menu will close, and the alphabetically first sub-list/category remaining (if any) will open automatically.

Apart from clicking the update button or deleting a sub-list/category, the list edit menu will also generally close when performing other actions such as changing or adding sub-lists/categories or adding/editing/deleting items. 

<p align="center"><img src="https://imgur.com/rMdRkDM.png" width=300><img src="https://imgur.com/1nYNCS2.png" width=300></p>

#### Adding New Items

When using a particular sub-list/category, use the item addition menu located at the bottom of the app to add new items and their quantities. Type an item name and a positive, integer quantity (which defaults to 1) in the appropriate text boxes and click on the + button to add an item. The addition will be unsuccessful and the user will be warned if a name or quantity is not provided or if an invalid quantity is provided. If an item is a duplicate of an existing item, the user will be prompted to either merge the input quantity to the existing quantity for that item or cancel the action. When an item is added or quantities are merged, the app will auto-scroll as necessary to display the item on screen. A newly added item and its quantity will display according to the current sub-list's/category's selected sorting option (see below).

<p align="center"><img src="https://imgur.com/MYe2P2q.png" width=300></p>

#### Editing and Deleting Items

Click on the orange edit button next to an item to open the item's edit menu. 

To rename the item, type a new name in the associated text box (which defaults to the original name) and click on the green update button. To change the quantity, click the + and - buttons or type a new positive, integer quantity (which defaults to the original quantity) in the associated text box and click on the green update button. Renaming the item and changing the quantity can be done at the same time. Any changes will be unsuccessful and the user will be warned if either a name or quantity is not provided or if an invalid quantity is provided. If the new item name is a duplicate of an existing item name, the user will be prompted to either merge quantities of the two (and delete the current version of the item) or cancel the action. When an item is successfully updated, the item edit menu will close and the entire sub-list/category will be re-sorted if necessary.

Prior to updating the item name or quantity, the user can click on the orange reset button to reset all text boxes to contain the original name and quantity.

To delete an item, click on the red delete button. The user will not be prompted to confirm the deletion.

Apart from clicking the update button or deleting an item, the current item edit menu will also generally close when performing other actions such as changing/adding/editing sub-lists/categories or adding/editing/deleting other items. 

<p align="center"><img src="https://imgur.com/oAW1K1k.png" width=300><img src="https://imgur.com/3fbce3Z.png" width=300></p>

#### Sorting items

When using a particular sub-list/category, click on the blue sort options button below the sub-list/category title to display a dropdown menu with sort options for items and quantities. Each sub-list/category can have a separate sort option applied.

Current options include:

- Original input order
- Alphabetical order for item names
- Reverse alphabetical order for item names
- Increasing numerical order for quantities
- Decreasing numerical order for quantities

<p align="center"><img src="https://imgur.com/mStLd8H.png" width=300><img src="https://imgur.com/ZU3vT1R.png" width=300></p>

## Potential Future Work

- Multiple master lists
- Item descriptions
- Touch capability
- Graphical updates

## Version History

#### v1.0.0 -- February 20, 2019

- Initial release
- Single master list with sub-lists/categories
- Most primary functionality
- Mouse-enabled