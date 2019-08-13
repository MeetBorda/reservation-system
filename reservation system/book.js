$(document).ready(function () {
            const db = firebase.database();
            var train = localStorage.getItem('train_id')
            var userId = localStorage.getItem('userId')
            console.log(train)
            $('.Next').on('click', function () {
                var noOfPassengers = $('input').val();
                console.log(noOfPassengers);


                var passengerDetails = $('.passengerDetails');
                passengerDetails.empty();
                for (var i = 0; i < noOfPassengers; i++) {
                    passengerDetails.append("<label>Passenger " + (i + 1) + " </label><input type='text' placeholder='Name' class='name" + i + "'><input type='number' placeholder='Age' class='age" + i + "'><br>");
                }
                passengerDetails.append('<lable>Mobile No </lable><input type="number" placeholder="Mobile No"><br> <button class="proceed">Proceed</button> ');

                $('.proceed').on('click', function () {
                    var TotalSeats
                    var trainRef = db.ref('/trains/' + train).once("value")
                        .then(function (snapshot) {
                            var AvailableSeats = snapshot.val().availableSeats
                            console.log(snapshot.val(), AvailableSeats, 'asdasdsad')
                            localStorage.setItem('avail', AvailableSeats)
                        })
                    var newAvail = localStorage.getItem('avail') - noOfPassengers

                    var dataRef = db.ref('/tickets/').push();
                    var key = dataRef.key
                    console.log(newAvail,'key')
                    var arr = []
                    for (var i = 0; i < noOfPassengers; i++) {
                        name = $(".name" + i).val();
                        age = parseInt($(".age" + i).val());
                        var obj = {};
                        obj['name'] = name
                        obj['age'] = age
                        arr.push(obj)


                    }
                    db.ref('/users/'+userId+'/booked/').set({ticketid:key})
db.ref('/trains/'+train+'/availableSeats').set(newAvail)
                    console.log(arr)
                    dataRef.set({
                        passengers: arr,
                        trainId: train,
                        userId: userId
                    })
                    window.location.href = "./booking.html"
                    })
                });

            });
        