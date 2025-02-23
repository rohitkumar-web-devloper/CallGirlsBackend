'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const city = [
      {
        stateId: 1,
        name: "Andhra Pradesh",
        cities: [
          "Visakhapatnam", "Vijayawada", "Guntur", "Kakinada", "Nellore", "Kurnool",
          "Rajamahendravaram", "Kadapa", "Mangalagiri-Tadepalli", "Tirupati", "Anantapuram",
          "Ongole", "Vizianagaram", "Eluru", "Proddatur", "Nandyal", "Adoni", "Madanapalle",
          "Machilipatnam", "Tenali", "Chittoor", "Hindupur", "Srikakulam", "Bhimavaram", "Tadepalligudem",
          "Guntakal", "	Dharmavaram", "Gudivada", "Narasaraopet", "Kadiri", "	Tadipatri", "Chilakaluripet"
        ]
      },
      {
        stateId: 2,
        name: "Arunachal Pradesh",
        cities: [
          "Itanagar", "Naharlagun", "Tawang", "Tezpur", "Ziro",
          "Bomdila", "Roing", "Pasighat", "Aalo", "Namsai",
          "Yingkiong", "Tirap", "Changlang", "Lohit", "Anjaw",
          "Khenewa", "Rupa", "Sangram", "Bame", "Tali",
          "Daporijo", "Aru", "Basar", "Miao", "Kimin",
          "Balijan", "Dikrong", "Sagalee", "Dambuk", "Longding",
          "Mogla", "Yazali", "Bordumsa", "Nayak", "Kaba",
          "Daporijo", "Daporijo Town", "Jorhat", "Chongkham", "Ziro Town",
          "Anini", "Mishmi", "Kamle", "Maji", "Malinithan",
          "Taliha", "Dibang Valley", "Wangcha", "Noklen", "Dirang",
          "Kundalini", "Tartong", "Geku", "Kaying", "Pakke Kessang",
          "Lohit Town", "Dambuk Town", "Doimukh", "Kimin Town", "Kanglung",
          "Pumao", "Sonitpur", "Dara", "Tarasso", "Balijan Town",
          "Bomdila Town", "Namsai Town", "Roing Town", "Pasighat Town", "Ziro Town",
          "Jang", "Chutia", "Chingkhang", "Pech", "Wangden", "Shiv Mandir", "Mele",
          "Singchung", "Kameng", "Mandal", "Puri", "Bameng", "Kevo", "Hokung",
        ]
      },
      {
        stateId: 3,
        name: "Assam",
        cities: [
          "Guwahati", "Dibrugarh", "Jorhat", "Sivasagar", "Tinsukia",
          "Dhubri", "Nagaon", "Silchar", "Barpeta", "Tezpur", "Bongaigaon",
          "Karimganj", "Haflong", "Morigaon", "Lakhimpur", "Cachar",
          "Nalbari", "Sonitpur", "Chirang", "Darrang", "Kamrup", "Dhemaji",
          "Bihpuria", "Bijni", "Dibrugarh", "Tinsukia", "Golaghat", "Hojai",
          "Nagaon", "Bilasipara", "Barpeta", "Jorhat", "Golaghat", "Sadiya",
          "Charaideo", "Kokrajhar", "Majuli", "Margherita", "Lakhimpur", "Kaliabor",
          "North Lakhimpur", "Sivasagar", "Dibrugarh", "Karbi Anglong", "Dhemaji",
          "Barpeta Road", "Tezpur", "Bokakhat", "Darrang", "Dhubri"
        ]
      },
      {
        stateId: 4,
        name: "Bihar",
        cities: [
          "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga",
          "Purnia", "Chhapra", "Bihar Sharif", "Munger", "Begusarai",
          "Samastipur", "Sasaram", "Buxar", "Siwan", "Motihari",
          "Sitamarhi", "Arrah", "Hajipur", "Katihar", "Bettiah",
          "Nalanda", "Jamalpur", "Kishanganj", "Lakhisarai", "Khagaria",
          "Supaul", "Vaishali", "Vaishali", "Kaimur", "Aurangabad",
          "Sheikhpura", "Rohtas", "Saran", "Madhubani", "Gopalganj",
          "Nawada", "East Champaran", "West Champaran", "Patliputra", "Samastipur",
          "Jahanabad", "Muzaffarpur", "Banka", "Madhubani", "Purnea", "Lakhisarai",
          "Hajipur", "Siwan", "Chhapra"
        ]
      },
      {
        stateId: 5,
        name: "Chhattisgarh",
        cities: [
          "Raipur", "Bilaspur", "Durg", "Bhilai", "Korba",
          "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur", "Kanker",
          "Dhamtari", "Mungeli", "Mahasamund", "Bilaspur", "Kawardha",
          "Chirmiri", "Durg", "Rajnandgaon", "Pendra", "Bemetara",
          "Takhatpur", "Kondagaon", "Narapara", "Malkangiri", "Raigarh",
          "Bilha", "Dongargarh", "Kharsia", "Bachra", "Pithora",
          "Sakti", "Bijapur", "Kondagaon", "Pendra Road", "Bodhghat", "Dabri",
          "Fingeshwar", "Pali", "Kurkheda", "Sarangarh", "Chhuikhadan",
          "Raigarh", "Pendra", "Kachandur", "Sarangarh", "Sundargarh", "Marwahi",
          "Bhatapara", "Pathalgaon", "Bachra", "Masturi"
        ]
      },
      {
        stateId: 6,
        name: "Goa",
        cities: [
          "Panaji", "Vasco da Gama", "Margao", "Mapusa", "Ponda",
          "Quepem", "Cortalim", "Bicholim", "Canacona", "Dona Paula",
          "Cuncolim", "Sanguem", "Siolem", "Aldona", "Assagao",
          "Arambol", "Calangute", "Candolim", "Anjuna", "Baga",
          "Chapora", "Dabolim", "Mormugao", "Verem", "Pernem",
          "Arossim", "Betalbatim", "Majorda", "Nuvem", "Raia",
          "Chinchinim", "Loutolim", "Benaulim", "Colva", "Varca",
          "Velsao", "Vasco", "Assolna", "Sernabatim", "Palolem",
          "Tivim", "Vasco da Gama", "Cortalim", "Loutolim", "Verna",
          "Navelim", "Panjim", "Dona Paula", "Tiswadi", "Nerul"
        ]
      },
      {
        stateId: 7,
        name: "Gujarat",
        cities: [
          "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar",
          "Junagadh", "Anand", "Nadiad", "Gandhinagar", "Vapi",
          "Morbi", "Mehsana", "Jamnagar", "Patan", "Valsad",
          "Navsari", "Dholka", "Palanpur", "Modasa", "Bharuch",
          "Daman", "Valsad", "Porbandar", "Sidhpur", "Bharuch",
          "Veraval", "Bapunagar", "Himatnagar", "Bhuj", "Unjha",
          "Tarsali", "Kadi", "Maninagar", "Viramgam", "Narmada",
          "Anjar", "Wadhwan", "Khambhat", "Rajpipla", "Surendranagar",
          "Nadiad", "Borsad", "Chhota Udepur", "Dhandhuka", "Pithoragarh",
          "Mansa", "Amreli", "Dholka", "Idar", "Atul"
        ]
      },
      {
        stateId: 8,
        name: "Haryana",
        cities: [
          "Faridabad", "Gurugram", "Ambala", "Hisar", "Rohtak",
          "Karnal", "Panipat", "Sonipat", "Yamunanagar", "Bhiwani",
          "Jhajjar", "Narnaul", "Fatehabad", "Palwal", "Sirsa",
          "Mahendragarh", "Charkhi Dadri", "Rewari", "Tohana", "Tosham",
          "Narwana", "Barwala", "Indri", "Ratia", "Hansi",
          "Loharu", "Gohana", "Assandh", "Kalayat", "Sadulpur",
          "Pehowa", "Jind", "Bawal", "Nuh", "Brahmanwas",
          "Berhampur", "Shahabad Markanda", "Panchkula", "Saha", "Pinjore",
          "Chandpur", "Baba Farid", "Gharaunda", "Mundlana", "Beri",
          "Kalka", "Jhukla", "Badli", "Narela", "Meham"
        ]
      },
      {
        stateId: 9,
        name: "Himachal Pradesh",
        cities: [
          "Shimla", "Manali", "Dharamshala", "Kullu", "Solan",
          "Mandi", "Palampur", "Kangra", "Bilaspur", "Hamirpur",
          "Una", "Nahan", "Kasauli", "Chamba", "Rampur",
          "Baijnath", "Nadaun", "Arki", "Sundernagar", "Baddi",
          "Nalagarh", "Chandigarh", "Nirath", "Bharmour", "Shoghi",
          "Nagrota", "Chail", "Sarkaghat", "Banjar", "Pangot",
          "Anni", "Kangra Valley", "Sirmaur", "Bijahi", "Sulah",
          "Jubbal", "Tattapani", "Seraj", "Sidhpur", "Kufri",
          "Rohru", "Ghumarwin", "Damtal", "Jassur", "Pandoh",
          "Suni", "Nirmand", "Bajoura", "Kahra", "Sainj"
        ]
      },
      {
        stateId: 10,
        name: "Jharkhand",
        cities: [
          "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Hazaribagh",
          "Giridih", "Deoghar", "Chaibasa", "Ramgarh", "Dumka",
          "Jamtara", "Koderma", "Khunti", "Palamu", "Pakur",
          "Godda", "Latehar", "Simdega", "Sahibganj", "Lohardaga",
          "Garhwa", "West Singhbhum", "Bokaro", "Chandwa", "Jharia",
          "Bermo", "Seraikela", "Chas", "Sundernagar", "Madhupur",
          "Kathikund", "Mahagama", "Tundi", "Bihar", "Barhi",
          "Chirkunda", "Dhanwar", "Dumri", "Gomia", "Ghatotand",
          "Chandrapura", "Barakar", "Madhupur", "Hazaribagh", "Kolkata",
          "Daltonganj", "Netarhat", "Dumri", "Rajganj", "Silli"
        ]
      },
      {
        stateId: 11,
        name: "Karnataka",
        cities: [
          "Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi",
          "Davanagere", "Ballari", "Shivamogga", "Bijapur", "Tumakuru",
          "Udupi", "Chitradurga", "Raichur", "Hassan", "Chikkamagaluru",
          "Mandya", "Bagalkot", "Kolar", "Chamarajanagar", "Karwar",
          "Gulbarga", "Bidar", "Haveri", "Yadgir", "Sira",
          "Koppal", "Ramanagaram", "Chikkaballapur", "Channarayapatna", "Savanur",
          "Karkala", "Anekal", "Kundapura", "Bantwal", "Puttur",
          "Kolar Gold Fields", "Agarakote", "Yelahanka", "Sarjapur", "Sampangirama Nagar",
          "Vijayapura", "Bhadravati", "Hospet", "Kushtagi", "Madhugiri",
          "Mulbagal", "Rajajinagar", "Vijayanagar", "Jayanagar", "Sadashivnagar"
        ]
      },
      {
        stateId: 12,
        name: "Kerala",
        cities: [
          "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam",
          "Malappuram", "Kannur", "Palakkad", "Alappuzha", "Pathanamthitta",
          "Kottayam", "Idukki", "Wayanad", "Ernakulam", "Kasargod",
          "Changanassery", "Punalur", "Payyannur", "Varkala", "Kattappana",
          "Muvattupuzha", "Kozhencherry", "Perumbavoor", "Cherthala", "Ottappalam",
          "Kollam", "Chalakudy", "Adoor", "Changanassery", "Kodungallur",
          "Chavakkad", "Karunagappally", "Kothamangalam", "Kaduthuruthy", "Vypin",
          "Kumarakom", "Sreekariyam", "Mattancherry", "Kottarakkara", "Cheruvathur",
          "Ambalapuzha", "Azhikode", "Kunnamkulam", "Vellayil", "Irimpanam",
          "Kanjirappally", "Ponnani", "Kallettumkara", "Vellur", "Valappad"
        ]
      },
      {
        stateId: 13,
        name: "Kerala",
        cities: [
          "Bhopal", "Indore", "Gwalior", "Ujjain", "Jabalpur",
          "Khandwa", "Sagar", "Satna", "Rewa", "Burhanpur",
          "Kolkata", "Chhindwara", "Shivpuri", "Mandsaur", "Dewas",
          "Khargone", "Sehore", "Vidisha", "Neemuch", "Balaghat",
          "Ratlam", "Tikamgarh", "Shahdol", "Damoh", "Panna",
          "Seoni", "Hoshangabad", "Alirajpur", "Shivpuri", "Narsinghpur",
          "Mandla", "Jhabua", "Betul", "Chhatarpur", "Anuppur",
          "Guna", "Shahdol", "Rajgarh", "Harda", "Barwani",
          "Mandsaur", "Narsinghpur", "Sihora", "Khargone", "Rewa",
          "Kachnar City", "Manawar", "Niwari", "Pipariya", "Burhanpur"
        ]
      },
      {
        stateId: 14,
        name: "Maharashtra",
        cities: [
          "Mumbai", "Pune", "Nagpur", "Nashik", "Thane",
          "Aurangabad", "Solapur", "Kolhapur", "Satara", "Chandrapur",
          "Akola", "Nanded", "Sangli", "Jalgaon", "Ratnagiri",
          "Parbhani", "Amravati", "Latur", "Palghar", "Bhandara",
          "Beed", "Yavatmal", "Wardha", "Washim", "Hingoli",
          "Dhule", "Nandurbar", "Raigad", "Sindhudurg", "Osmanabad",
          "Bid", "Rajnandgaon", "Gadchiroli", "Kalyan", "Ulhasnagar",
          "Karad", "Miraj", "Barshi", "Shirdi", "Vasai-Virar",
          "Panvel", "Bhiwandi", "Khamgaon", "Talegaon Dabhade", "Chakan",
          "Vengurla", "Sawantwadi", "Vashi", "Malad", "Andheri",
          "Kandivali", "Borivali", "Dadar", "Kalyan-Dombivli", "Dombivli",
          "Vile Parle", "Worli", "Vikhroli", "Lower Parel", "Byculla",
          "Versova", "Jogeshwari", "Bandra", "Kurla", "Chembur",
          "Sion", "Parel", "Mulund", "Goregaon", "Mira-Bhayandar",
          "Mankhurd", "Pimpri-Chinchwad", "Wagholi", "Shivaji Nagar", "Juhu",
          "Kandivli", "Chinchwad", "Mulund", "Thane West", "Thane East",
          "Navi Mumbai", "Kamothe", "Kharghar", "Panvel", "Nerul",
          "Airoli", "Ghansoli", "Sanpada", "Belapur", "Kopar Khairane",
          "Dombivli East", "Dombivli West", "Kalyan East", "Kalyan West",
          "Badlapur", "Ulhasnagar", "Navi Mumbai", "Chandrapur", "Jalna",
          "Pune", "Vasai", "Miraj", "Akola", "Jalgaon"
        ]
      },
      {
        stateId: 15,
        name: "Manipur",
        cities: [
          "Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul",
          "Kangpokpi", "Tamenglong", "Senapati", "Jiribam", "Noney",
          "Kakching", "Kangla", "Moirang", "Lamlai", "Keirao",
          "Yairipok", "Wangjing", "Moijing", "Hiyanglam", "Sugnu",
          "Lamlong", "Mayang Imphal", "Nungba", "Tadubi", "Khongjom",
          "Khurai", "Tera", "Langjing", "Heirok", "Saikul",
          "Karong", "Lambui", "Sanjenbam", "Sapermaina", "Kumbi",
          "Kangchup", "Khangabok", "Pallel", "Lokchao", "Oinam",
          "Mongshangei", "Phoudel", "Ishok", "Thongjao", "Nambol",
          "Sora", "Chandel", "Litan", "Saikot", "Sangaiyumpham",
          "Chingai", "Khunbi", "Tungnoupal"
        ]
      },
      {
        stateId: 16,
        name: "Meghalaya",
        cities: [
          "Shillong", "Tura", "Nongpoh", "Jowai", "Baghmara",
          "Williamnagar", "Mawkyrwat", "Mairang", "Resubelpara", "Nongstoin",
          "Ampati", "Cherrapunji", "Pynursla", "Sohra", "Khasi Hills",
          "Laitkynsew", "Pynursla", "Laba", "Tyrna", "Rongram",
          "Borsora", "Laitumkhrah", "Lawsohtun", "Dalu", "Selsella",
          "Jowai", "Mawkma", "Mawlai", "Nongthymmai", "Lumpyngngad",
          "Wahlang", "Riangdo", "Rongrenggre", "Bambai", "Sohiong",
          "Nengchigen", "Langkyrdem", "Wahiajer", "Rangblang", "Mairang",
          "Mowkaiaw", "Dawar", "Sohra", "Umden", "Cherra",
          "Tyrna", "Shilliang", "Markasa", "Lailad", "Khanduli"
        ]
      },
      {
        stateId: 17,
        name: "Mizoram",
        cities: [
          "Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib",
          "Mamit", "Lawngtlai", "Saiha", "Hnahthial", "Khawzawl",
          "Biate", "Chhingchhip", "Khawhai", "Rengkai", "Saitual",
          "Zohnuai", "Kawnpui", "Tuipui", "Vairengte", "Siaha",
          "Tlabung", "Venghlui", "Tuisih", "Phullen", "Bualpui",
          "Darlawn", "Chua", "Lungdai", "Zawlnuam", "Khuangpui",
          "Bualte", "Khamrang", "Khawbung", "Dinthar", "Bualpui",
          "Saipum", "Zohmun", "Ruantlang", "Chhingchhip", "Sunsari",
          "Simpang", "Sarthal", "Buanthar", "Thingdawl", "Tlangnuam",
          "Tayawthang", "Hmuifang", "Champhai", "Phai", "Lunglei",
          "Chite", "Saikah", "Lai", "Thenzawl", "Sakawrtu",
          "Thakthing", "Pukpui", "Tuipuibari", "Dapchhuah", "Sethai",
          "Dompui", "Lungvar", "Vangchhia", "Lungphun", "Chhemlui",
          "Muanthang", "Tualte", "Pukpui", "Sanzang", "Saitual",
          "Sumdailo", "Rohmuia", "Thazual", "Mualcheng", "Ailawng",
          "Sikpui", "Hmuifang", "Chhingpui", "Thangliana", "Khuailian",
          "Thakthing", "Sengnuai", "Thahchhunga", "Khawhrua", "Champhai",
          "Tlangzawl", "N. Champhai", "Hualngo", "Sareih", "Khakchang",
          "Siaha", "Zawlnuam", "Tuipui", "Vantlang", "Lungmual",
          "Hnamte", "Vairengte", "Tualzang", "Ramthar", "Chhimtuipui"
        ]
      },
      {
        stateId: 18,
        name: "Nagaland",
        cities: [
          "Kohima", "Dimapur", "Mokokchung", "Mon", "Zunheboto",
          "Tuensang", "Peren", "Wokha", "Longleng", "Kiphire",
          "Chümoukedima", "Noklak", "Pfütsero", "Chizami", "Ruzhukhrie",
          "Khonoma", "Süngshu", "Liphanyan", "Tuli", "Satoi",
          "Tseminyu", "Pangsha", "Atoizu", "Naginimora", "Akuluto",
          "Jalukie", "Longkong", "Khezha", "Yechri", "Sangtam",
          "Zunheboto", "Liphanyan", "Phek", "Shamator", "Tayap",
          "Kikire", "Vikuto", "Akhoya", "Chare", "Zuketsa",
          "Haphruba", "Lukhai", "Kuthi", "Lampsang", "Chozuba",
          "Khasa", "Ichang", "Vihokhu", "Changki", "Tsüdema",
          "Mokokchung Town", "Kohima Town", "Dimapur Town", "Peren District",
          "Chümoukedima District", "Wokha District", "Tuensang District", "Mon District",
          "Longleng District", "Zunheboto District", "Phek District", "Kiphire District",
          "Akuluto", "Chukitong", "Khehovi", "Kekrima", "Kidzema",
          "Dikhu River", "Moilan", "Tsegwi", "Maromi", "Bokajan",
          "Wokha Town", "Zunheboto Town", "Kohima Village", "Vishwema", "Mithun",
          "Shamator Town", "Chakhesang", "Pongidang", "Molung", "Mao", "Kezo Town",
          "Tenyimi", "Hoksha", "Khezhakeno", "Gizama", "Shishami",
          "Tzüsama", "Lamhai", "Atoizu", "Runguzu", "Dimapur Airport",
          "Tening", "Krohma", "Merapang", "Puching", "Chazou", "Jalukie Town",
          "Saramati", "Sambalpur", "Chuchuyimlang", "Chieswema", "Kharimok", "Nyiro",
          "Kukhai", "Phusachodu", "Mao", "Pukhanu", "Rongsen", "Ttuensang Village"
        ]
      },
      {
        stateId: 19,
        name: "Odisha",
        cities: [
          "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Bargarh",
          "Balasore", "Sambalpur", "Puri", "Koraput", "Angul",
          "Kendrapara", "Bhadrak", "Jeypore", "Baripada", "Khurda",
          "Dhenkanal", "Nayagarh", "Jagatsinghpur", "Boudh", "Rayagada",
          "Keonjhar", "Malkangiri", "Nabarangpur", "Puri", "Cuttack",
          "Rairangpur", "Kalinganagar", "Ganjam", "Jharsuguda", "Mendhasala",
          "Sundargarh", "Nuapada", "Kalahandi", "Bolangir", "Jajpur",
          "Kendujhar", "Gajapati", "Bargarh", "Sambalpur", "Subarnapur",
          "Khordha", "Nayagarh", "Nuapada", "Ganjam", "Jagatsinghpur",
          "Bhadrak", "Puri", "Sonepur", "Bolangir", "Malkangiri",
          "Boudh", "Mayurbhanj", "Cuttack", "Balesore", "Khurda",
          "Puri", "Khordha", "Sundargarh", "Kandhamal", "Jajpur",
          "Puri", "Bhubaneswar", "Sambalpur", "Bargarh", "Dhenkanal",
          "Koraput", "Keonjhar", "Sonepur", "Angul", "Jharsuguda",
          "Bolangir", "Rayagada", "Malkangiri", "Berhampur", "Rourkela",
          "Cuttack", "Kendrapara", "Bhubaneswar", "Balesore", "Sundargarh",
          "Kalahandi", "Nabarangpur", "Khordha", "Baripada", "Puri",
          "Kendujhar", "Bargarh", "Balasore", "Dhenkanal", "Puri",
          "Rairangpur", "Mayurbhanj", "Sambalpur", "Rayagada", "Cuttack",
          "Koraput", "Sundargarh", "Angul", "Malkangiri", "Balasore",
          "Jajpur", "Ganjam", "Sambalpur", "Boudh", "Bolangir"
        ]
      },
      {
        stateId: 20,
        name: "Punjab",
        cities: [
          "Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Mohali",
          "Bathinda", "Chandigarh", "Hoshiarpur", "Gurdaspur", "Moga",
          "Firozpur", "Rupnagar", "Sangrur", "Faridkot", "Barnala",
          "Kapurthala", "Tarn Taran", "Fatehgarh Sahib", "Pathankot",
          "Mansa", "Sri Muktsar Sahib", "Nawanshahr", "Abohar", "Zirakpur",
          "Khamano", "Kapurthala", "Bassi Pathana", "Bhadohi", "Banga",
          "Budhlada", "Malout", "Dhuri", "Sunam", "Raikot",
          "Dera Bassi", "Jagraon", "Dasuya", "Mullanpur", "Jandiala Guru",
          "Kharar", "Macher", "Jalalabad", "Muktsar", "Kohara",
          "Banur", "Shahkot", "Dinanagar", "Samrala", "Bhalai",
          "Dera Baba Nanak", "Nabha", "Sardulgarh", "Kandiala", "Sahnewal",
          "Brahmpura", "Shahpur", "Narainpur", "Gurditpura", "Sohian",
          "Dinanagar", "Makhu", "Vallah", "Rahon", "Lalton Kalan",
          "Chheharta", "Saidpur", "Kohara", "Nangal", "Matiya",
          "Fattuwal", "Darbara", "Khurd", "Wadala", "Mananwala",
          "Ghuliana", "Akaula", "Pattran", "Bhairon", "Jhumba",
          "Faridkot", "Majitha", "Lehal", "Rupan", "Ballewal"
        ]
      },
      {
        stateId: 21,
        name: "Rajasthan",
        cities: [
          "Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer",
          "Bikaner", "Alwar", "Churu", "Sikar", "Tonk",
          "Bhilwara", "Pali", "Nagaur", "Jaisalmer", "Barmer",
          "Ratangarh", "Bundi", "Sawai Madhopur", "Dungarpur", "Rajsamand",
          "Sri Ganganagar", "Chittorgarh", "Banswara", "Jhunjhunu", "Jalore",
          "Hanumangarh", "Karauli", "Sirohi", "Baran", "Dholpur",
          "Jhalawar", "Merta", "Pratapgarh", "Bhilwara", "Pali",
          "Banswara", "Churu", "Jaisalmer", "Tonk", "Ajmer",
          "Nimbaheda", "Mavli", "Nathdwara", "Rishabhdev", "Bhilwara",
          "Sardarshahar", "Kankroli", "Ramganj Mandi", "Kota", "Udaipur",
          "Jodhpur", "Nagaur", "Ganganagar", "Fatehpur", "Mundwa",
          "Rajgarh", "Sumerpur", "Sanganer", "Salumbar", "Jodhpur",
          "Sirohi", "Kishangarh", "Chaksu", "Niwai", "Banswara",
          "Sojat", "Karauli", "Khetri", "Shahpura", "Bundi",
          "Baran", "Chhabra", "Dausa", "Makrana", "Sangaria",
          "Sirohi", "Barmer", "Phalodi", "Luni", "Anupgarh",
          "Pali", "Fatehpur", "Hindaun", "Ganganagar", "Jaitaran"
        ]
      },
      {
        stateId: 22,
        name: "Sikkim",
        cities: [
          "Gangtok", "Namchi", "Jorethang", "Mangan", "Pakyong",
          "Rangpo", "Rongli", "Singtam", "Lachung", "Lachen",
          "Yuksom", "Gyalshing", "Kewzing", "Bermiok", "Biksthang",
          "Martam", "Chungthang", "Tadong", "Tinkitam", "Rinchenpong",
          "Singtam", "Lower Lachung", "Sakyong", "Dikchu", "Chakhung",
          "Tumin", "Temi", "Siniolchu", "Tokalung", "Kangchenjunga",
          "Melli", "Soreong", "Jorethang", "Namchi", "Rangpo",
          "Sikkim Himalayan", "Denzong", "Sikkim Khada", "Zarong",
          "Yuksom", "Lachung", "Bersay", "Rimay", "Patal",
          "Khango", "Nepal", "Mingik", "Salghari", "Chungthang",
          "Makha", "Phedang", "Chungtang", "Biling", "Nayabazar"
        ]
      },
      {
        stateId: 23,
        name: "Tamil Nadu",
        cities: [
          "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
          "Tirunelveli", "Erode", "Vellore", "Tiruppur", "Thoothukudi",
          "Dindigul", "Kanchipuram", "Cuddalore", "Karaikudi", "Nagercoil",
          "Pudukkottai", "Villupuram", "Tiruvannamalai", "Nagapattinam", "Sivakasi",
          "Rajapalayam", "Karur", "Pollachi", "Ramanathapuram", "Chidambaram",
          "Kumbakonam", "Ariyalur", "Vikramasingapuram", "Kanchipuram", "Azhagappapuram",
          "Sankarankovil", "Tirukalukundram", "Vedaranyam", "Manamadurai", "Valparai",
          "Perambalur", "Sevur", "Kadayanallur", "Ambasamudram", "Kanyakumari",
          "Kanniyakumari", "Tindivanam", "Rishivandiyam", "Valliyur", "Thiruvallur",
          "Chengalpattu", "Avadi", "Mettur", "Sirkali", "Sivaganga",
          "Udhagamandalam", "Tirukoilur", "Rajapalayam", "Virudhunagar", "Eraniel",
          "Thanjavur", "Karaikal", "Periyakulam", "Coonoor", "Harur",
          "Madurai East", "Madurai West", "Sankarankovil", "Krishnagiri", "Palladam",
          "Ambur", "Manamadurai", "Chennai North", "Chennai South", "Madhurandhagam",
          "Nellai", "Attur", "Gingee", "Nellikuppam", "Lalgudi",
          "Tiruchengode", "Annavasal", "Mullipallam", "Pattukkottai", "Nagore",
          "Thiruvarur", "Sankari", "Uppiliyapuram", "Uzhavoor", "Mettupalayam",
          "Kodaikanal", "Kovilpatti", "Tiruvannamalai", "Kallakurichi", "Dharapuram",
          "Tiruchirapalli", "Ilanthirayan", "Alangulam", "Tindivanam", "Arani"
        ]
      },
      {
        stateId: 24,
        name: "Telangana",
        cities: [
          "Hyderabad", "Warangal", "Khammam", "Karimnagar", "Nizamabad",
          "Nalgonda", "Mahbubnagar", "Medak", "Adilabad", "Rangareddy",
          "Suryapet", "Sircilla", "Jangaon", "Mancherial", "Kamareddy",
          "Peddapalli", "Nagarkurnool", "Jogulamba Gadwal", "Jayashankar", "Khammam",
          "Kothagudem", "Sangareddy", "Yadadri", "Vikarabad", "Medchal",
          "Mahabubabad", "Wanaparthy", "Malkajgiri", "Secunderabad", "Bhadrachalam",
          "Peddapalli", "Kagaznagar", "Bhimavaram", "Achampet", "Nirmal",
          "Miryalaguda", "Bodhan", "Jagtial", "Siddipet", "Kodad",
          "Narayanpet", "Malkajgiri", "Choutuppal", "Bhongir", "Suryapet",
          "Chilkur", "Sangareddy", "Tandur", "Miryalguda", "Medchal",
          "Hyderabad North", "Hyderabad South", "Hyderabad Central", "Banjara Hills",
          "Himayat Nagar", "LB Nagar", "Gachibowli", "Rajendranagar", "Shamshabad",
          "Khairatabad", "Nagole", "Kukatpally", "Madhapur", "Erragadda",
          "Kothagudem", "Parigi", "Serilingampally", "Malkajgiri", "Medchal",
          "Zahirabad", "Mahabubnagar", "Shadnagar", "Sangareddy", "Peddapalli",
          "Siddipet", "Nizamabad", "Sircilla", "Adilabad", "Warangal Rural",
          "Warangal Urban", "Khammam", "Peddapalli", "Medak", "Mahabubabad",
          "Jangaon", "Vikarabad", "Nalgonda", "Hyderabad West", "Hyderabad East",
          "Kamareddy", "Rangareddy", "Bodhan", "Yadadri", "Choppadandi"
        ]
      },
      {
        stateId: 25,
        name: "Tripura",
        cities: [
          "Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Belonia",
          "Ambassa", "Khowai", "Mohonpur", "Ranir Bazar", "Bishalgarh",
          "Sonamura", "Sabroom", "Teliamura", "Jirania", "Melaghar",
          "Kanchanpur", "Lalbazar", "Sidhai", "Madhupur", "Bagma",
          "Santirbazar", "Asharambari", "Amarpur", "Agartala (North)", "Agartala (South)",
          "Dhalai", "Khowai", "Teliamura", "Mungiakami", "Amarpur",
          "Chandrapur", "Maharanipur", "Rishyamukh", "Bishalgarh", "Charilam",
          "Jirania", "Vishalgarh", "Madhav Bari", "Bagafa", "Manu",
          "Kanchanpur", "Kamalpur", "Bishalgarh", "Ranir Bazar", "Barjala",
          "Barapathar", "Puranapathar", "Takarjala", "Manikya Nagar", "Badharghat",
          "Gokulnagar", "Rajnagar", "Khumulwng", "Barmura", "Bhuiyanpara",
          "Gournagar", "Ghatjuri", "Madhya Bazar", "Jampuijala", "Piyali",
          "Rajbari", "Dhalai", "Nabagram", "Kathalia", "Khayerpur",
          "Sankarpur", "Chandrapur", "Rakhi", "Bagajatan", "Balaram Para",
          "Nayanpur", "Baraichhara", "Rangamati", "Bishalgarh", "Birendra Nagar",
          "Srirampur", "Bamachhara", "Shibnagar", "Kasba", "Kanchanbari",
          "Sonamura", "Udaipur", "Kailashahar", "Belonia", "Dharmanagar",
          "Agartala South", "Bishalgarh", "Takarjala", "Udaipur", "Madhupur",
          "Agartala North", "Madhabkunda", "Sonamura", "Teliamura", "Mohonpur"
        ]
      },
      {
        stateId: 26,
        name: "Uttar Pradesh",
        cities: [
          "Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi",
          "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Badaun",
          "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda",
          "Barabanki", "Bareilly", "Basti", "Bijnor", "Budaun",
          "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah",
          "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar",
          "Ghaziabad", "Gonda", "Gorakhpur", "Hamirpur", "Hapur",
          "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi",
          "Kannauj", "Kanpur", "Kanpur Dehat", "Kasganj", "Kushinagar",
          "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Mau", "Meerut",
          "Mirzapur", "Moradabad", "Muzaffarnagar", "Pratapgarh", "Raebareli",
          "Rampur", "Saharanpur", "Sambhal", "Shahjahanpur", "Shrawasti",
          "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi",
          "Bijnor", "Pilibhit", "Muzzafarnagar", "Shahjahanpur", "Chitrakoot",
          "Mainpuri", "Hardoi", "Azamgarh", "Gorakhpur", "Banda",
          "Basti", "Jhansi", "Sitapur", "Kanpur Nagar", "Chandoli",
          "Lakhimpur", "Moradabad", "Sultanpur", "Farrukhabad", "Hathras",
          "Gonda", "Aligarh", "Rampur", "Faizabad", "Bagpat",
          "Saharanpur", "Shahjahanpur", "Raebareli", "Budaun", "Mahoba",
          "Barabanki", "Jalaun", "Lucknow", "Mirzapur", "Deoria"
        ]
      },
      {
        stateId: 27,
        name: "Uttarakhand",
        cities: [
          "Dehradun", "Nainital", "Haridwar", "Rishikesh", "Roorkee",
          "Haldwani", "Pantnagar", "Kashipur", "Pauri", "Almora",
          "Nanakmatta", "Rudrapur", "Kichha", "Tehri", "Mussoorie",
          "Harshil", "Srinagar", "Jaspur", "Lansdowne", "Champawat",
          "Bageshwar", "Bhowali", "Bijnor", "Khatima", "Pithoragarh",
          "Ramnagar", "Bazpur", "Kotdwara", "Rohilkhand", "Bajpur",
          "Manglaur", "Bhikiyasain", "Gairsain", "Chakrata", "Buda Khera",
          "Sahaspur", "Narendra Nagar", "Vikasnagar", "Chandpur", "Jwalapur",
          "Bahadrabad", "Rajpur", "Dhanaulti", "Doiwala", "Saha",
          "Kalsi", "Siyari", "Muni ki Reti", "Birsana", "Mukteshwar",
          "Kharsali", "Dhanori", "Pauri Garhwal", "Kundal Singh", "Shivpuri",
          "Clement Town", "Lohaghat", "Paurikhal", "Sahastra Dhara", "Musharaf",
          "Baijnath", "Madhuban", "Ishwar Ashram", "Pindar", "Rishikesh District",
          "Nagni", "Kanatal", "Ghorakhal", "Kandoli", "Jajra", "Kundri",
          "Sundar Nagar", "Chaukhutia", "Nanakmatta", "Bhulana", "Singhpur",
          "Pashulok", "Auli", "Sundar Nagar", "Shyampur", "Phool Chatti",
          "Hatu Peak", "Bhujiyaghat", "Ramnagar Town", "Kanva Ashram",
          "Madhyamaheshwar", "Aithor", "Nayagaon", "Teri", "Sambhu",
          "Nagpur", "Sikandarpur", "Sakri", "Nauli", "Chhitkul", "Dholi",
          "Nabha", "Sarsai", "Maneri", "Khandala", "Baldi", "Haripura"
        ]
      },
      {
        stateId: 28,
        name: "West Bengal",
        cities: [
          "Kolkata", "Siliguri", "Asansol", "Durgapur", "Howrah",
          "Berhampore", "Burdwan", "Kalyani", "Malda", "Chandannagar",
          "Haldia", "Raiganj", "Cooch Behar", "Jalpaiguri", "Krishnanagar",
          "Baharampur", "Nadia", "Medinipur", "Purulia", "Diamond Harbour",
          "Kolar", "Jalpaiguri", "Kharagpur", "Ranaghat", "Santipur",
          "Burdwan", "Kolkata South", "Kolkata North", "Bishnupur", "Dhanekhali",
          "Tamluk", "Suri", "Santoshpur", "Raghunathganj", "Panagarh",
          "Sankrail", "Sikarpur", "Chinsurah", "Nabadwip", "Krishnanagar",
          "Madhyamgram", "Bidhannagar", "Haringhata", "Sonarpur", "Panchla",
          "Bankura", "Murarai", "Bishnupur", "Jitpur", "Barasat",
          "Tamluk", "Purulia", "Baharampur", "Khidirpur", "Shibpur",
          "Chandernagore", "Naihati", "Bagnan", "Chanchal", "Gangarampur",
          "Rampurhat", "Kushmandi", "Khardaha", "Bhowanipore", "Alambazar",
          "Uttarayon", "Sundarban", "Bagnan", "Madhyamgram", "Baruipur",
          "Jalalsi", "Ghoshpara", "Egra", "Naihati", "Sonarpur",
          "Dakshin Barasat", "Raghunathganj", "Surul", "Koyra", "Raghunathganj",
          "Ramnagar", "Bidhan Sarani", "Nayatola", "Khanakul", "Jadavpur",
          "Panihati", "Kolar", "Gokulpur", "Mandirtala", "Banagram",
          "Palta", "Madhusree", "Sodepur", "Chirulia", "New Barrackpore",
          "Sundarpur", "Halisahar", "Bogra", "Shibpur", "Sakherbazar",
          "Haldia", "Diamond Harbor", "Chinsurah", "Mankundu", "Kalyani",
          "Uluberia", "Mogra", "Ranishwar", "Bolpur", "Khagrabari", "Dharmatala"
        ]
      },
    ]
    
    const citiesToInsert = city.flatMap(state => {
      return state.cities.map(cityName => ({
        name: cityName,
        stateId: state.stateId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    });
    await queryInterface.bulkInsert('Cities', citiesToInsert, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
