
fetch("https://restcountries.eu/rest/v2/all")
  .then(
    response => {
        //console.log(response.status);
      response.json()
        .then(data => {
          var d = data
          .filter(c => c.cioc )
          .reduce((acc, c) => {
            return [...acc, { "short": c.cioc, "name": c.name.split(" (")[0], "region": c.region }];
          }, []);
          console.log(d);
      })
    }
  );
