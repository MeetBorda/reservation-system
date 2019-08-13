$(document).ready(function () {

            const db = firebase.database();

            var currentUser = localStorage.getItem("userId")

            var query = db.ref('/users/' + currentUser + '/booked/').orderByKey();

            query.once("value")
                .then(function (snapshot) {
                    var ticketId = snapshot.val()
                    db.ref('/tickets/'+ticketId).once("value").then(function(snapshot){
                        console.log(snapshot.val)
                    })
                    $('#table').find('tr:not(:first)').remove();
                    $('#table').append(" <tr class='info' ><td>" + ticketId + "</td><td>" + snapshot.val().name + "</td><td>" + localStorage.getItem(train_id) + "</td></tr><a id='cancel_now' href='#'>cancel</a>");
                
                })

                })