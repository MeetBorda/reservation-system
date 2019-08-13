$(document).ready(function () {
    /////////////////////// LOGIN using GMAIL
    var emailId, userName
    $('#signin').click(function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                emailId = result.user.email
                userName = result.user.displayName
                const db = firebase.database();
                var query = db.ref("/users/").orderByKey();
                query.once("value")
                    .then(function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            var key = childSnapshot.key;
                            var existingUser = childSnapshot.val().email;
                            console.log(existingUser,emailId)
                            if (existingUser === emailId) {
                                window.location.href = './booking.html'
                                localStorage.setItem("userId",key);
                            
                                return true
                            } else {
                                dataRef = db.ref('/users/').push();
                                var key = dataRef.key
                                db.ref('/users/').set({
                                        name: userName,
                                        email: emailId,
                                        //booked:[] realtime database doesnt take empty array so i will update the user at the end 
                                    }).then(e =>  {
                                        window.location.href = './booking.html'
                                    localStorage.setItem("userId",key);
                                    console.log('got my new user')
                                }).catch(err => console.log(err))

                            }
                        });
                    });

            })

            .catch(err => {
                console.log(err);
            })
    })
})