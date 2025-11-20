const CONTAINER = document.getElementById('container');

fetch('Assets/data/MOCK_DATA.json')
    .then((response) => response.json())
    .then((data) => displayData(data))
    .catch((error) => displayError(error))

function displayData(data){
    console.log(data);

    const FILTERED = data.filter ( (obj) => obj.age >= 20 && obj.age <39 )
    // const SUB_FILTER = FILTERED.filter ( (obj) => obj.gender == "Female")
    // const SUB_FILTER2 = SUB_FILTER.filter ( (obj) => obj.gender == "male")

    console.log(FILTERED.length)

    const SORT = FILTERED.sort ((a,b) => a.age - b.age)

    // for (let person of SORT){

    for (let person of FILTERED) {
        console.log(person)

        const PERSON_BOX = document.createElement('li');
        const PERSON_INFO = document.createElement('div');
        const PERSON_BAR = document.createElement('div');
        
        
        PERSON_INFO.textContent = `${person.first_name} ${person.last_name}, ${person.gender} ${person.age}`;

        // bar
        const BAR_width = person.age * 5;
        PERSON_BAR.style.width = `${BAR_width}px`;
        PERSON_BAR.className = 'bar';    


        let BAR_COLOR = 'gray'

        if (person.gender == 'Male') {
            BAR_COLOR = 'blue';
        }

        else if (person.gender == 'Female') { 
            BAR_COLOR = 'pink';
        }
        else {
            BAR_COLOR = 'orange';
        }

        PERSON_BAR.style.backgroundColor = BAR_COLOR;

        PERSON_BOX.appendChild(PERSON_INFO);
        PERSON_BOX.appendChild(PERSON_BAR);

        CONTAINER.appendChild(PERSON_BOX);
    }
}

function displayError(error) {
    console.error('Errore nel fetch:', error);
   }


    