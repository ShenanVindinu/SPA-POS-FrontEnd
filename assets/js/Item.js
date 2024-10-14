$(document).ready(function() {

    getAllItems();

    $("#ItemSave").click(function() {

        let itemName = $("#ItemNameField").val();
        let itemQTY = $("#ItemQTYField").val();
        let itemPrice = $("#ItemPriceField").val();

        console.log(itemName);
        console.log(itemQTY);
        console.log(itemPrice);

        const itemData = {
            name: itemName,
            qty: itemQTY,
            price: itemPrice
        };

        console.log(itemData);
        const itemJson = JSON.stringify(itemData);
        console.log(itemJson);

        $.ajax({
            url: "http://localhost:8080/POS_BackEnd/api/v1/item",
            type: "POST",
            data: itemJson,
            headers: {"Content-Type":"application/json"},
            success: (res) => {
                console.log(JSON.stringify(res));
                getAllItems();
            },
            error: (res) => {
                console.log(res);
            }
        });


    });

    $("#deleteItem").click(function() {

        let itemId = $("#ItemCodeField").val();
    
        $.ajax({
            url: "http://localhost:8080/POS_BackEnd/api/v1/item/" + itemId,
            type: "DELETE",
            success: (res) => {
                console.log("Delete Response:", JSON.stringify(res));
                getAllItems();
            },
            error: (res) => {
                console.log("Error during deletion:", JSON.stringify(res));
            }
        });
    });

    $("#updateItem").click(function () {
        
        let itemName = $("#ItemNameField").val();
        let itemQTY = $("#ItemQTYField").val();
        let itemPrice = $("#ItemPriceField").val();

        console.log(itemName);
        console.log(itemQTY);
        console.log(itemPrice);

        const itemData = {
            name: itemName,
            qty: itemQTY,
            price: itemPrice
        };

        console.log(itemData);
        const itemJson = JSON.stringify(itemData);
        console.log(itemJson);
       
    
        $.ajax({
            url: "http://localhost:8080/POS_BackEnd__JavaEE/Item",
            type: "PUT",
            data: itemJson,
            headers: {"Content-Type": "application/json"},
            success: (res) => {
                console.log('PUT Success:',JSON.stringify(res));
                getAllItems();
            },
            error: (res) => {
                console.error(res);
            }            
        });
    });

    function getAllItems() {
        $.ajax({
            url: "http://localhost:8080/POS_BackEnd/api/v1/item",
            type: "GET",
            headers: {"Content-Type": "application/json"},
            success: (res) => {
                console.log(JSON.stringify(res));
                populateItemTable(res);
            },
            error: (res) => {
                console.error(res);
            }            
        });
    }

    function populateItemTable(items) {
        const $tableBody = $('#ItemTableBody');
        $tableBody.empty(); 
    
        items.forEach(item => {
            const $row = $('<tr></tr>'); // Create a new row
            
            // Create and append cells to the row
            $('<td></td>').text(item.id).appendTo($row);
            $('<td></td>').text(item.name).appendTo($row);
            $('<td></td>').text(item.price).appendTo($row);
            $('<td></td>').text(item.qty).appendTo($row);
    
            // Append the row to the table body
            $tableBody.append($row);
        });
    }

    

    $("#clearItem").click(function () {
        $("#ItemNameField").val("");
        $("#ItemQTYField").val("");
        $("#ItemPriceField").val("");
        $("#ItemCodeField").val("");
    });

});