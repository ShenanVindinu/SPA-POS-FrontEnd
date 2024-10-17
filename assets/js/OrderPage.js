$(document).ready(function() {

    setDate(); 
    function setDate() {
        var today = new Date().toISOString().split('T')[0];
        $('#OrderDateField').val(today);
    }

});

$(document).ready(function() {
    // Load all customer IDs into the dropdown
    $.ajax({
        url: 'http://localhost:8080/POS_BackEnd/api/v1/customer',
        method: 'GET',
        success: function(data) {
            var dropdownMenu = $('#CustomerIDDropDownMenu');
            dropdownMenu.empty();  

            data.forEach(function(customer) {
                // Add customer to dropdown
                var listItem = `<li><a class="dropdown-item" href="#" data-id="${customer.id}" 
                                        data-name="${customer.name}" 
                                        data-salary="${customer.salary}" 
                                        data-address="${customer.address}">
                                        ${customer.id}</a></li>`;
                dropdownMenu.append(listItem);
            });
        },
        error: function(error) {
            console.error("Error fetching customer data:", error);
        }
    });

    // Handle customer selection and autofill fields
    $(document).on('click', '#CustomerIDDropDownMenu .dropdown-item', function(event) {
        event.preventDefault();

        
        var customerID = $(this).data('id');
        var customerName = $(this).data('name');
        var customerSalary = $(this).data('salary');
        var customerAddress = $(this).data('address');

        
        $('#CustomerIDField2').val(customerID);       
        $('#CustomerNameField2').val(customerName);    
        $('#CustomerSalaryField2').val(customerSalary);
        $('#CustomerAddressField2').val(customerAddress);
    });
});

$(document).ready(function() {
    // Load all items into the dropdown
    $.ajax({
        url: 'http://localhost:8080/POS_BackEnd/api/v1/item',  
        method: 'GET',
        success: function(data) {
            var dropdownMenu = $('#ItemDropDownMenu');
            dropdownMenu.empty();  

            data.forEach(function(item) {
                // Add item to dropdown
                var listItem = `<li><a class="dropdown-item" href="#" data-code="${item.id}" 
                                        data-name="${item.name}" 
                                        data-price="${item.price}" 
                                        data-qty="${item.qty}">
                                        ${item.name}</a></li>`;
                dropdownMenu.append(listItem);
            });
        },
        error: function(error) {
            console.error("Error fetching items:", error);
        }
    });

    // Handle item selection and autofill fields
    $(document).on('click', '#ItemDropDownMenu .dropdown-item', function(event) {
        event.preventDefault();

        
        var itemCode = $(this).data('code');
        var itemName = $(this).data('name');
        var itemPrice = $(this).data('price');
        var qtyOnHand = $(this).data('qty');

        
        $('#ItemCodeField2').val(itemCode);   
        $('#ItemNameField2').val(itemName);   
        $('#ItemPriceField2').val(itemPrice);  
        $('#QtyOnHandField').val(qtyOnHand);   
    });
});

$(document).ready(function() {
    var cartTotal = 0;
    var subTotal = 0;

    $('#AddToCart').on('click', function() {
        
        var itemCode = $('#ItemCodeField2').val();
        var itemName = $('#ItemNameField2').val();
        var itemPrice = parseFloat($('#ItemPriceField2').val());  // Convert to float for calculations
        var orderQty = parseInt($('#OrderQtyField').val());  // Order quantity field (you'll need to add this input)

        
        var total = itemPrice * orderQty;

        
        if (itemCode && itemName && itemPrice && orderQty) {
            
            var newRow = `<tr data-item-code="${itemCode}">
                            <td>${itemCode}</td>
                            <td>${itemName}</td>
                            <td>${itemPrice.toFixed(2)}</td>
                            <td>${orderQty}</td>
                            <td>${total.toFixed(2)}</td>
                          </tr>`;

            
            $('#OrderTableBodyID').append(newRow);

            
            cartTotal += total;
            subTotal += total;

            
            $('#totalText').text('Total : Rs.' + cartTotal.toFixed(2));
            $('#SubTotalText').text('Sub Total : Rs.' + subTotal.toFixed(2));

            
            $('#ItemCodeField2').val('');
            $('#ItemNameField2').val('');
            $('#ItemPriceField2').val('');
            $('#OrderQtyField').val('');
        } else {
            alert('Please fill in all fields before adding to the cart.');
        }
    });

    
    $('#CashInputField, #DiscountInputField').on('input', function() {
        
        var cash = parseFloat($('#CashInputField').val()) || 0;  // Default to 0 if empty
        var discount = parseFloat($('#DiscountInputField').val()) || 0;  // Default to 0 if empty

        
        var subTotalAfterDiscount = subTotal - discount;

        
        $('#SubTotalText').text('Sub Total : Rs.' + subTotalAfterDiscount.toFixed(2));

        
        var balance = cash - subTotalAfterDiscount;

        
        $('#BalanceInputField').val(balance.toFixed(2));
    });
});

$(document).ready(function() {
    $('#PlaceOrderBtn').on('click', function(event) {
        let orderData = {
            orderItems: []
        };
    
        // Collecting order items data
        $('#OrderTableBodyID tr').each(function() {
            let itemCode = $(this).find('td:nth-child(1)').text();
            let itemName = $(this).find('td:nth-child(2)').text();
            let price = parseFloat($(this).find('td:nth-child(3)').text());
            let quantity = parseInt($(this).find('td:nth-child(4)').text());
            let total = parseFloat($(this).find('td:nth-child(5)').text());
    
            orderData.orderItems.push({
                itemId: itemCode,
                itemName: itemName,
                itemPrice: price.toString(),
                orderQTY: quantity.toString(),
                total: total.toString()
            });
        });
    
        
        let queryString = $.param({
            id: $("#OrderID").val(),
            date: $("#OrderDateField").val(),
            customerId: $("#CustomerIDField2").val(),
            customerName: $("#CustomerNameField2").val(),
            customerSalary: $("#CustomerSalaryField2").val(),
            customerAddress: $("#CustomerAddressField2").val()
        });
    
        
        $.ajax({
            url: 'http://localhost:8080/POS_BackEnd/api/v1/order?' + queryString, 
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(orderData),
            success: function(response) {
                console.log('Order saved successfully:', response);
            },
            error: function(error) {
                console.error('Error saving order:', error);
            }
        });
    });    
    
});

