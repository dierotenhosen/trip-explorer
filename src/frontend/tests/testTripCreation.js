async function testTripCreation() {
   const response = await fetch('http://localhost:8000/trips/', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
           name: "My Trip",
           start_date: "2023-10-01",
           end_date: "2023-10-10",
           notes: "Excited for this trip!",
           firebase_uid: "uid_123"
       })
   });
   const data = await response.json();
   console.log(data);
}

testTripCreation();