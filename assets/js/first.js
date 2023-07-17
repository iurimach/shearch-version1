fetch('./assets/js/json/data.json') 
  .then(response => response.json())
  .then(Mydata => { 


    const personalInformation = Mydata.data; 

    function createTable(Mydata) { var table = document.createElement("table")
    table.setAttribute('id' , 'table');
      var thead = document.createElement("thead");
      var tbody = document.createElement("tbody");
      var tfoot = document.createElement("tfoot"); 


       var headerRow = document.createElement("tr");

      var headerNames = ["სახელი", "პროფესია", "დაბადების ადგილი", 'ზიპ კოდი', "კარიერის დაწყება", "სასურველი ხელფასი"];


       headerNames.forEach(function (headerName) { var th = document.createElement("th");

        th.textContent = headerName;
        
        headerRow.appendChild(th);


 });


 thead.appendChild(headerRow);
  Mydata.forEach(function (obj) { 
        var row = document.createElement("tr");
        Object.keys(obj).forEach(function (key) { 


          var cell = document.createElement("td"); 

          cell.textContent = obj[key]; 
          row.appendChild(cell);   });

        tbody.appendChild(row); 
        tbody.appendChild(row); 
        
       

      });






  var footerRow = document.createElement("tr");
  var footerCell = document.createElement("td");

  footerCell.style.textAlign = "center";
  footerCell.textContent = "სტატუსი: აქტიურია!";
  footerRow.appendChild(footerCell);
  tfoot.appendChild(footerRow);














     
      table.appendChild(thead);
      table.appendChild(tbody);
      table.appendChild(tfoot);

      return table; 
    }

  
    var tableContainer = document.getElementById("tableContainer");

   tableContainer.appendChild(createTable(personalInformation));

  })


  .catch(error => { 
    console.error('Error:', error);
  });






























// -----------------------------------------  ძებნა ------------------------------------------------





  async function fetchJSON() {
    try {
      const response = await fetch('./assets/js/json/data.json');
      const jsonData = await response.json();
      return jsonData.data; 
    } catch (error) {
      console.error('Error fetching JSON:', error);
      return null;
    }
  }

  function searchByName(data, keyword) {
    const results = [];

    for (const entry of data) {
      const name = entry[0].toLowerCase();

      if (name.includes(keyword)) {  
        results.push(entry);
        var tabledel = document.getElementById('table');
        tabledel.style.display="none"
       

      }
    }

    return results;
  }

  function displayResults(results) {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    if (results.length === 0) {
      resultsList.innerHTML = '<li>No results found.</li>';
    } else {
      for (const entry of results) {
        const listItem = document.createElement('li');
        listItem.textContent = entry.join(' | ');
        resultsList.appendChild(listItem);

        
      }
    }
  }

  document.getElementById('searchButton').addEventListener('click', async () => {
    const keyword = document.getElementById('searchInput').value;

    if (keyword.trim() === '') {
      alert('Please enter a search keyword.');
      return;
    }

    try {
      const data = await fetchJSON();

      if (data) {
        const searchResults = searchByName(data, keyword);
        displayResults(searchResults);
      }
    } catch (error) {
      console.error('Error fetching or processing JSON:', error);
    }
  });



  //-------------------------------------ძებნა პროფესიით ---------------

