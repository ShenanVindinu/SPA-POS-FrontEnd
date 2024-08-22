$(document).ready(function () {

    $("#SaveConfirm").click(function () {
        event.preventDefault();

        let CusName = $("#CustomerNameField").val();
        let CusAdress = $("#CustomerAddressField").val();
        let CusSalary = $("#CustomerSalaryField").val();

        console.log(CusName);
        console.log(CusAdress);
        console.log(CusSalary);

        const customerJson = {
            name: CusName,
            address: CusAdress,
            salary: CusSalary
        };

        $.ajax({
            url: "http://localhost:8080/POS_BackEnd__JavaEE/Customer",
            type: "POST",
            data: customerJson,
            headers: {"Content-Type": "application/json"},
            success: (res) => {
                console.log(JSON.stringify(res));
            },
            error: (res) => {
                console.error(res);
            }            
        });

    });

});