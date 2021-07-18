//For course>>program>>stream
function populate4(s1, s2) {
    var s1 = document.getElementById(s1);
    var s2 = document.getElementById(s2);
    s2.innerHTML = "";
    if (s1.value == "Engineering") {
        var optionArray = ["|", "B.Tech|B.Tech", "B.TechLeet|B.Tech-Leet", "M.Tech|M.Tech", ];
    } else if (s1.value == "MBA") {
        var optionArray = ["|", "MBA|MBA"];
    } else if (s1.value == "BCA") {
        var optionArray = ["|", "BCA|BCA"];
    } else if (s1.value == "BBA") {
        var optionArray = ["|", "BBA|BBA"];
    } else if (s1.value == "Vocational") {
        var optionArray = ["|", "BVoc|B.Vocational"];
    } else if (s1.value == "Diploma") {
        var optionArray = ["|", "Diploma|Diploma", "DiplomaLeet|Diploma-Leet"];
    }

    for (var option in optionArray) {
        var pair = optionArray[option].split("|");
        var newOption = document.createElement("option");
        newOption.value = pair[0];
        newOption.innerHTML = pair[1];
        s2.options.add(newOption);
    }
}

function populate(s1, s2) {
    var s1 = document.getElementById(s1);
    var s2 = document.getElementById(s2);
    s2.innerHTML = "";
    if (s1.value == "B.Tech") {
        var optionArray = ["|", "CSE|Computer Science Engineering", "CE|Civil Engineering", "ME|Mechanical Engineering",
            "EE|Electrical Engineering", "ECE|Electronics & Communication Engineering"
        ];
    } else if (s1.value == "B.TechLeet") {
        var optionArray = ["|", "CSE|Computer Science Engineering", "CE|Civil Engineering", "ME|Mechanical Engineering",
            "EE|Electrical Engineering", "ECE|Electronics & Communication Engineering"
        ];
    } else if (s1.value == "M.Tech") {
        var optionArray = ["|", "ECE|Electronics and Communication Engineering", "CSE|Computer Science And Engineering",
            "M&A|Manufacturing And Automation", "EPS|Electrical Power System"
        ];
    } else if (s1.value == "Diploma") {
        var optionArray = ["|", "CE|Civil Engineering", "ME|Mechanical Engineering",
            "EE|Electrical Engineering", "ECE|Electronics & Communication Engineering"
        ];
    } else if (s1.value == "DiplomaLeet") {
        var optionArray = ["|", "AE|Automobile Engineering", "CE|Civil Engineering", "ME|Mechanical Engineering",
            "EE|Electrical Engineering", "ECE|Electronics & Communication Engineering"
        ];
    } else if (s1.value == "BBA") {
        var optionArray = ["|", "BBA|BBA"];
    } else if (s1.value == "MBA") {
        var optionArray = ["|", "MBA|MBA"];
    } else if (s1.value == "BCA") {
        var optionArray = ["|", "BCA|BCA"];
    } else if (s1.value == "BVoc") {
        var optionArray = ["|", "T&T|Travel And Tourism", "SDIT|Software Development [ IT ]",
            "BFIns|Banking,Financial Services And Insurance"
        ];
    }
    for (var option in optionArray) {
        var pair = optionArray[option].split("|");
        var newOption = document.createElement("option");
        newOption.value = pair[0];
        newOption.innerHTML = pair[1];
        s2.options.add(newOption);
    }
}

//for hostel>>transport>>stop's name selection
function populate3(s1, s2) {
    var s1 = document.getElementById(s1);
    var s2 = document.getElementById(s2);
    s2.innerHTML = "";
    if (s1.value == "no") {
        var optionArray = ["|", "no|NO", "yes|YES"];
    } else if (s1.value == "yes") {
        var optionArray = ["|", "no|NO"];
    }
    for (var option in optionArray) {
        var pair = optionArray[option].split("|");
        var newOption = document.createElement("option");
        newOption.value = pair[0];
        newOption.innerHTML = pair[1];
        s2.options.add(newOption);
    }
}

function populate2(s1, s2) {
    var s1 = document.getElementById(s1);
    var s2 = document.getElementById(s2);
    s2.innerHTML = "";
    if (s1.value == "no") {
        var optionArray = ["|", "NO|I don't want transport"];
    } else if (s1.value == "yes") {
        var optionArray = ["|", "Naya Gaon|Naya Gaon",
            "Bahadurgarh|Bahadurgarh",
            "Jhajjar More|Jhajjar More",
            "Bahadurgarh Bus Stand|Bahadurgarh Bus Stand",
            "Ballore Road Sec - 9|Ballore Road Sec - 9",
            "Bahadurgarh Sec - 6, 2|Bahadurgarh Sec - 6, 2",
            "Mitrao|Mitrao",
            "Khar|Khar",
            "Jharoda Kalan|Jharoda Kalan",
            "Tikri Village|Tikri Village",
            "Chhawla Stand|Chhawla Stand",
            "Hirankudna Hostel|Hirankudna Hostel",
            "Mundka|Mundka",
            "Najafgarh - Anaj Mandi|Najafgarh - Anaj Mandi",
            "Najafgarh - Tura Mandi|Najafgarh - Tura Mandi",
            "Najafgarh - Arjun Park|Najafgarh - Arjun Park",
            "Najafgarh - Sai Baba Mandir| Najafgarh - Sai Baba Mandir",
            "Punjabi Bagh(East)|Punjabi Bagh(East)",
            "Punjabi Bagh Circle|Punjabi Bagh Circle",
            "Rani Bagh|Rani Bagh",
            "Rithala Metro Stn|Rithala Metro Stn",
            "Tilak Nagar|Tilak Nagar",
            "Uttam Nagar Terminal|Uttam Nagar Terminal",
            "Hari Nagar|Hari Nagar",
            "Bawana|Bawana",
            "KaramPura|KaramPura",
            "Kirti Nagar|Kirti Nagar",
            "Moti Nagar|Moti Nagar",
            "NSP Pitampura|NSP Pitampura",
            "Rajouri Garden|Rajouri Garden",
            "Shadipur Depot|Shadipur Depot",
            "Wazirpur Depot|Wazirpur Depot",
            "Anand Parvat|Anand Parvat",
            "Dabri More|Dabri More",
            "Inderlok Metro Stn|Inderlok Metro Stn",
            "Kanhaiya Nagar Metro Stn|Kanhaiya Nagar Metro Stn",
            "Janakpuri D - Block|Janakpuri D - Block",
            "Sagarpur|Sagarpur",
            "Shalimar Bagh|Shalimar Bagh",
            "Shashtri Nagar Metro Stn|Shashtri Nagar Metro Stn",
            "Karol Bagh(Tibbia College)|Karol Bagh(Tibbia College)",
            "Mayapuri Chowk|Mayapuri Chowk",
            "Naraina Flyover|Naraina Flyover",
            "Patel Nagar|Patel Nagar",
            "Rajender Nagar|Rajender Nagar",
            "Azadpur Metro Stn|Azadpur Metro Stn",
            "Delhi Cantt.|Delhi Cantt.",
            "Inderpuri|Inderpuri",
            "Model Town(Kotak Mahindra Bank)|Model Town(Kotak Mahindra Bank)",
            "Kingsway Camp|Kingsway Camp",
            "Mall Road|Mall Road",
            "Timarpur|Timarpur",
            "Wazirabad|Wazirabad",
            "Bhajanpura|Bhajanpura",
            "Preet Vihar|Preet Vihar",
            "Laxmi Nagar|Laxmi Nagar",
            "A.I.I.M.S|A.I.I.M.S",
            "South Ex.(Mehra Sons)|South Ex.(Mehra Sons)",
            "Kanjhawala|Kanjhawala",
            "Rajdhani Park|Rajdhani Park",
            "Dwarka More|Dwarka More",
            "Dwarka - NSIT|Dwarka - NSIT",
            "Dwarka Sec - 3, 4|Dwarka Sec - 3, 4",
            "Dwarka Spg Apt|Dwarka Spg Apt",
            "Nangloi Depot|Nangloi Depot",
            "Nangloi Police Stn|Nangloi Police Stn",
            "Nangloi Railway Stn|Nangloi Railway Stn",
            "Mohan Garden|Mohan Garden",
            "Karala|Karala",
            "Peeragarhi|Peeragarhi",
            "Udyog Nagar Metro Stn|Udyog Nagar Metro Stn",
            "Multan Nagar|Multan Nagar",
            "Paschim Vihar(East) Metro Stn|Paschim Vihar(East) Metro Stn",
            "Police Line|Police Line",
            "Rajeev Nager|Rajeev Nager",
            "Madipur|Madipur",
            "Meera Bagh|Meera Bagh",
            "BegamPur|BegamPur",
            "Deepali Chowk|Deepali Chowk",
            "Palam Flyover|Palam Flyover",
            "Shivaji Park|Shivaji Park",
            "Vikash Puri|Vikash Puri",
            "Bitaniya Red Light|Bitaniya Red Light",
            "District Center|District Center",
            "Madhuban Chowk|Madhuban Chowk"
        ];
    }
    for (var option in optionArray) {
        var pair = optionArray[option].split("|");
        var newOption = document.createElement("option");
        newOption.value = pair[0];
        newOption.innerHTML = pair[1];
        s2.options.add(newOption);
    }
}