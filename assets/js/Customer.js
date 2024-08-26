$(document).ready(function () {

    $("#CusSaveBt").click(function () {

        let CusName = $("#CustomerNameField").val();
        let CusAdress = $("#CustomerAddressField").val();
        let CusSalary = $("#CustomerSalaryField").val();

        console.log(CusName);
        console.log(CusAdress);
        console.log(CusSalary);

        const customerData = {
            name: CusName,
            address: CusAdress,
            salary: CusSalary
        };

        console.log(customerData);
        const customerJson = JSON.stringify(customerData);
        console.log(customerJson);

        $.ajax({
            url: "http://localhost:8080/POS_BackEnd__JavaEE/Customer",
            type: "POST",
            data: customerJson,
            headers: {"Content-Type": "application/json"},
            success: (res) => {
                console.log(JSON.stringify(res));
                $.ajax({
                    url: "http://localhost:8080/POS_BackEnd__JavaEE/Customer",
                    type: "GET",
                    headers: {"Content-Type": "application/json"},
                    success: (res) => {
                        console.log(JSON.stringify(res));
                        populateCustomerTable(res);
                    },
                    error: (res) => {
                        console.error(res);
                    }            
                });
            },
            error: (res) => {
                console.error(res);
            }            
        });
    });

    $("#CustomerDeleteButton").click(function() {

        let CusName = $("#CustomerNameField").val();
    
        $.ajax({
            url: `http://localhost:8080/POS_BackEnd__JavaEE/Customer?name=${encodeURIComponent(CusName)}`,
            type: "DELETE",
            success: (res) => {
                console.log("Delete Response:", JSON.stringify(res));
                $.ajax({
                    url: "http://localhost:8080/POS_BackEnd__JavaEE/Customer",
                    type: "GET",
                    headers: {"Content-Type": "application/json"},
                    success: (res) => {
                        console.log("Customer List:", JSON.stringify(res));
                        populateCustomerTable(res);
                    },
                    error: (res) => {
                        console.error("Error fetching customer list:", res);
                    }            
                });
            },
            error: (res) => {
                console.log("Error during deletion:", JSON.stringify(res));
            }
        });
    });
    
    function populateCustomerTable(customers) {
        const $tableBody = $('#customerTableBody');
        $tableBody.empty(); 
    
        if (customers.length === 0) {
            const $row = $('<tr></tr>');
            $('<td colspan="4">No customers available</td>').appendTo($row);
            $tableBody.append($row);
        } else {
            customers.forEach(customer => {
                const $row = $('<tr></tr>'); // Create a new row
                
                // Create and append cells to the row
                $('<td></td>').text(customer.id).appendTo($row);
                $('<td></td>').text(customer.name).appendTo($row);
                $('<td></td>').text(customer.address).appendTo($row);
                $('<td></td>').text(customer.salary).appendTo($row);
        
                // Append the row to the table body
                $tableBody.append($row);
            });
        }
    }

    $("#CustomerClearBt").click(function() {
        let CusName = $("#CustomerNameField").val("");
        let CusAdress = $("#CustomerAddressField").val("");
        let CusSalary = $("#CustomerSalaryField").val("");
    });
    

});