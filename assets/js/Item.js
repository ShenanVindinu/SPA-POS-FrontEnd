$(document).ready(function() {

    $("#ItemSave").click(function() {

        let ItemName = $("#ItemNameField").val();
        let ItemQTY = $("#ItemQTYField").val();
        let ItemPrice = $("#ItemPriceField").val();

        console.log(ItemName);
        console.log(ItemQTY);
        console.log(ItemPrice);

        const itemData = {
            name: ItemName,
            qty: ItemQTY,
            price: ItemPrice
        };

        console.log(itemData);
        const itemJson = JSON.stringify(itemData);
        console.log(itemJson);

        $.ajax({
            url: "http://localhost:8080/POS_BackEnd__JavaEE/Item",
            type: "POST",
            data: itemJson,
            Headers: {"Content-Type":"application/json"},
            success: (res) => {
                console.log(JSON.stringify(res));
                $.ajax({
                    url: "http://localhost:8080/POS_BackEnd__JavaEE/Item",
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
            },
            error: (res) => {
                console.log(res);
            }
        });
        

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


    });

    $("#clearItem").click(function () {
        let ItemName = $("#ItemNameField").val("");
        let ItemQTY = $("#ItemQTYField").val("");
        let ItemPrice = $("#ItemPriceField").val("");
    });

});