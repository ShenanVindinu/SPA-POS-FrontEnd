$(document).ready(function () {

    getAllCustomers();

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
            url: "http://localhost:8080/POS_BackEnd/api/v1/customer",
            type: "POST",
            data: customerJson,
            headers: {"Content-Type": "application/json"},
            success: (res) => {
                console.log(JSON.stringify(res));
                getAllCustomers();
            },
            error: (res) => {
                console.error(res);
            }            
        });
    });

    $("#CustomerDeleteButton").click(function() {

        let cusId = $("#CustomerIDField").val();
    
        $.ajax({
            url: 'http://localhost:8080/POS_BackEnd/api/v1/customer/' + cusId,
            type: "DELETE",
            success: (res) => {
                console.log("Delete Response:", JSON.stringify(res));
                getAllCustomers();
            },
            error: (res) => {
                console.log("Error during deletion:", JSON.stringify(res));
            }
        });
    });

    $("#CustomerUpdateButton").click(function () {
        let CusName = $("#CustomerNameField").val();
        let CusAddress = $("#CustomerAddressField").val();
        let CusSalary = $("#CustomerSalaryField").val();
    
        console.log(CusName);
        console.log(CusAddress);
        console.log(CusSalary);
    
        const customerData = {
            name: CusName,
            address: CusAddress,
            salary: CusSalary
        };
    
        console.log(customerData);
        const customerJson = JSON.stringify(customerData);
        console.log(customerJson);
    
        
        const customerName = CusName; 
    
        $.ajax({
            url: "http://localhost:8080/POS_BackEnd__JavaEE/Customer",
            type: "PUT",
            data: customerJson,
            headers: {"Content-Type": "application/json"},
            success: (res) => {
                console.log('PUT Success:',JSON.stringify(res));
                getAllCustomers();
            },
            error: (res) => {
                console.error(res);
            }            
        });
    });

    function getAllCustomers() {
        $.ajax({
            url: "http://localhost:8080/POS_BackEnd/api/v1/customer",
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
    }
    
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
        $("#CustomerNameField").val("");
        $("#CustomerAddressField").val("");
        $("#CustomerSalaryField").val("");
        $("#CustomerIDField").val("");
    });

    
    

});