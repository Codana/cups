
fetch("https://restcountries.eu/rest/v2/all")
  .then(
    response => {
      //console.log(response.status);
      response.json()
        .then(data => {
          let d = data.filter(c => c.cioc && c.region == "Africa" )
            .reduce((acc, c) => {
              return [...acc, { "short": c.cioc, "name": c.name.split(" (")[0], "region": c.region }];
            }, []);
          console.log(d);
        })
    }
  );
