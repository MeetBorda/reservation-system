$(document).ready(function () {

    const db = firebase.database();
    var from;
    var to;
    var currentUser = localStorage.getItem("userId")
    console.log(currentUser)
    console.log(db)
    
    //selecting  the value from FROM
    $(".pickup").change(function () {
        from = $('.pickup option:selected').text().toLowerCase();
        console.log(from);
    });

    //selecting  the value from TO
    $(".destination").change(function () {
        to = $('.destination option:selected').text().toLowerCase();
        console.log(to);
    });


    $('#book_button').on('click', function () {
        var tra;
        var trains2;
        console.log(from);
        var query = db.ref("/cities/"+from.toLowerCase()+'/trains/')

        query.once("value")
        .then(function(snapshot){
            tra = snapshot.val()
            console.log(tra)
            for (var i = 0; i < tra.length; i++) {
                var query = db.ref("/trains/"+tra[i])
                query.once("value")
                .then(function(snapshot){
                    // console.log(snapshot.val(),"value")
                    var check = snapshot.val().destination
                    if(check == to){
                        console.log(check,to,snapshot.key)
                        trains2 = snapshot.key
                        var doc = snapshot.val()
                        localStorage.setItem("train_id",trains2)

                        $('#table').find('tr:not(:first)').remove();
                        $('#table').append(" <tr class='info' ><td>"+ trains2 +"</td><td>"+ doc.name +"</td><td>"+ doc.availableSeats+"</td><td>"+ doc.totalSeats +"</td><td><a id='book_now' href='./book.html'>Book Now</a></td></tr>");
                    
                    }
                }).catch(err=>console.log(err))
            }
        })
        
    })
    $('#book_now').on('click',function(){
        console.log('inm asd ')
    })


})