const apiURL = 'http://localhost:5213/api/PatientDemographics';
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const formScroll = document.querySelector('.patient-form-container');
const form = document.getElementById('patient-info-form');
const previewImage = document.getElementById('patient-image');
const resetBtn = document.getElementById('resetbtn');
const userDOB = document.getElementById('dob');
var age;
form.addEventListener('submit', saveFormData);
resetBtn.addEventListener('click', resetFormData);
userDOB.addEventListener('change',getAge);


function uploadImage(){
    var file = document.getElementById("patient-image");
    var formdata = new FormData();
    formdata.append("patient_id", id);
    formdata.append("image", file.files[0]);
    
    fetch('http://localhost:5213/api/PatientDemographics/uploadimage', {
    method: 'PUT',
    body: formdata,
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}


// Function is returns patient's data if patient id provided in URL.
function getDataById(){
    if(id != null && id != 0){
        fetch(`${apiURL}/id=${id}`)
        .then(res => res.json())
        .then(data => {
            // Here we are checking that patient data is available or not means if -1 value return then data are not present.
            if(data != -1){
                document.getElementById("fname").value = data.PatientDemographics[0].firstname;
                document.getElementById("patientid").textContent = data.PatientDemographics[0].chartnumber;
                document.getElementById("lname").value = data.PatientDemographics[0].lastname;
                document.getElementById("mname").value = data.PatientDemographics[0].middlename;
                document.getElementById("sex").value = data.PatientDemographics[0].gender_id;
                if (data.PatientDemographics[0].dob != null){
                    document.getElementById("dob").value = data.PatientDemographics[0].dob.split("T")[0];
                    getAge();
                }
                document.getElementById('patient-image-tag').src = data.PatientDemographics[0].patient_image;
            }
            else{
                alert("Patient doesn't found!");
                location.replace((window.location.href).split("?")[0]);
                
            }
        })
    }
}
window.onload = getDataById();

// Function is used for create new patient if id not available in URL, and if id is available then update the patient data.
function insertUpdateData(){
    var patientApiURL = apiURL;
    var patientData = {
        firstname: document.getElementById('fname').value,
        lastname: document.getElementById('lname').value,
        middlename: document.getElementById('mname').value,
        gender_id: document.getElementById('sex').value,
        dob: document.getElementById('dob').value
    };
    var methodType = '';
    if(id != null){
        methodType = 'PUT';
        patientApiURL = patientApiURL + '/id=' + id;
    }
    else{
        methodType = 'POST';
    }
    
    
    fetch(patientApiURL, {
        method: methodType,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(patientData)
    })
    .then(res => res.json())
    .then(data => {
        if(data != 0){
            if(methodType == 'PUT'){
                alert(`Patient ID:${data} Updated Successfully`);
            }
            else{
                alert(`Patient ID:${data} Added Successfully`);
                window.location.replace(`${window.location}?id=${data}`);
            }
        }
        else{
            if(methodType == 'PUT'){
                alert(`Patient ID:${data} Doesn't Updated Successfully`);
            }
            else{
                alert(`Patient ID:${data} Doesn't Added Successfully`);
            }
        }
    })
    .catch(error => console.log('error'))
}

// This function is used for add shadow to form buttons at time of scroll event.
formScroll.addEventListener('scroll', (event) => {
    let scroll = formScroll.scrollTop;
    if (scroll == 0) {
        document.querySelector('.form-buttons-section').style.boxShadow = "none";
    } else{
        document.querySelector('.form-buttons-section').style.boxShadow = "0px 4px 5px rgb(162 165 169 / 25%)";
    }
});

// This function is used to preview the while uploading new patient impage.
previewImage.onchange = () => {
    const [file] = previewImage.files;
    console.log(file);
    if (file){
        var imgTag = document.getElementById('patient-image-tag');
        imgTag.src = URL.createObjectURL(file);
    }
}

// This function is used for find age from the birthdate field.
function getAge(){
    var dob = new Date(userDOB.value);
    var nowdate = new Date();
    age = nowdate.getFullYear() - dob.getFullYear();
    document.getElementById('age').textContent = `${age}Y`;
}

// This function is called when save button click means form submit event occurs.
function saveFormData(event) {
    
    event.preventDefault();
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const sex = document.getElementById('sex').value;
    
    if(fname != ""){
        document.getElementById('require-fname').innerHTML = '';
        if(lname != ""){
            document.getElementById('require-lname').innerHTML = '';
            if(sex != ""){
                document.getElementById('require-sex').innerHTML = '';
                if(age > 18){
                    const myFormData = new FormData(event.target);
                    const formDataObj = {};
                    myFormData.forEach((value, key) => (formDataObj[key] = value));
                    console.log(formDataObj);
                    
                    // Function is used for create new patient if id not available in URL and if id is available then update the patient data.
                    insertUpdateData();
                }
                else{
                    alert('Please Fillup The Contact Form');
                }
            }
            else{
                document.getElementById('require-sex').innerHTML = 'Please Enter Sex';
            }
        }
        else{
            document.getElementById('require-lname').innerHTML = 'Please Enter Last Name';
        }
    }
    else{
        document.getElementById('require-fname').innerHTML = 'Please Enter First Name';
    }
    
}

// This function reset the field of form.
function resetFormData(){
    if(confirm('Are you sure, You want reset form ?')){
        document.getElementById('require-sex').innerHTML = '';
        document.getElementById('require-lname').innerHTML = '';
        document.getElementById('require-fname').innerHTML = '';
        var imgTag = document.getElementById('patient-image-tag');
        imgTag.src = './assets/image/patientimg.png';
        form.reset();
    }
    getDataById();
}

// This function is used for add contact detail part like add home contact address or work contact address.
function addContactDetailFrom(){
    const contactFormDetailHTML = `<div class="contact-detail-form">
    <fieldset>
    <legend><select name="" id="" class="select-option" style="width: 10rem;">
    <option value="" selected>Home</option>
    <option value="" >Work</option>
    <option value="">Other</option>
    </select></legend>
    <div class="contact-container">
    <div class="address-header d-flex w-100" style="justify-content: space-between; margin-bottom: 0.5rem;">
    <div>
    <span class="font-dark" style="font-weight: 700; font-size: 1rem;">Address <i
    class="fa-solid fa-circle-plus cursor-pointer btn-scale d-none" id="add-address-btn"
    onclick=" addAddressField(this)"></i></span>
    </div>
    <div class="right-align-item">
    <i class="fa-solid fa-trash-can cursor-pointer btn-scale" onclick="removeContactForm(this)"></i>
    </div>
    </div>
    <div id="address-field">
    <div class="street-field" style="width: 66%;">
    <div>
    <label for="">Street</label>
    </div>
    <div>
    <input type="text" class="input-tag" id="" name="" placeholder="">
    </div>
    </div>
    <div class="address-field d-flex">
    <div class="margin-tbr" style="width: 25%;">
    <div>
    <label for="">Zip</label>
    </div>
    <div class="">
    <input type="text" class="input-tag" id="" name="" placeholder="">
    </div>
    </div>
    <div class="margin-tbr" style="width: 25%;">
    <div>
    <label for="">City</label>
    </div>
    <div>
    <input type="text" class="input-tag" id="" name="" placeholder="">
    </div>
    </div>
    <div class="margin-tbr" style="width: 20%;">
    <div>
    <label for="">State</label>
    </div>
    <div>
    <select name="" id="" class="select-option">
    <option value="">Washington</option>
    <option value="">Alabama</option>
    <option value="">Alaska</option>
    <option value="">Arizona</option>
    </select>
    </div>
    </div>
    <div class="margin-tbr" style="width: 20%;">
    <div>
    <label for="">Country</label>
    </div>
    <div>
    <select name="" id="" class="select-option">
    <option value="">US</option>
    <option value="">India</option>
    <option value="">Australia</option>
    <option value="">US</option>
    </select>
    </div>
    </div>
    <div class="margin-tbr" style="width: 10%;">
    <i class="fa-solid fa-trash-can cursor-pointer btn-scale" onclick="removeAddressField(this)"></i>
    </div>
    </div>
    </div>
    
    <div class="phone-form">
    <span class="font-dark" style="font-weight: 700;">Phone <i
    class="fa-solid fa-circle-plus cursor-pointer btn-scale" onclick="addPhoneField(this)"></i></span>
    <div class="phone-field">
    <div class="d-flex w-100 border-bottom phone-lable">
    <div class="margin-tbr" style="width: 20%; padding-left: 0.1rem;">
    <label for="">Type</label>
    </div>
    <div class="margin-tbr" style="width: 20%; padding-left: 0.1rem;">
    <label for="">Code</label>
    </div>
    <div class="margin-tbr" style="width: 30%; padding-left: 0.2rem;">
    <label for="">Number</label>
    </div>
    <div class="margin-tbr" style="width: 20%; padding-left: 0.1rem;">
    <label for="">Ext.</label>
    </div>
    <div class="margin-tbr" style="width: 15%; padding-left: 0.1rem;">
    
    </div>
    </div>
    <div class="d-flex d-center phone-input">
    <div class="margin-tbr" style="width: 20%;">
    <select name="" id="" class="select-option">
    <option value="">Cell</option>
    <option value="">Landline</option>
    </select>
    </div>
    <div class="margin-tbr" style="width: 20%;">
    <select name="" id="" class="select-option">
    <option value="">+1 United States</option>
    <option value="">+1 Puerto Rico</option>
    <option value="">+93 Afghanistan</option>
    <option value="">+355 Albania</option>
    <option value="">+213 Algeria</option>
    <option value="">+1 American Samoa</option>
    <option value="">+376 Andorra</option>
    <option value="">+244 Angola</option>
    <option value="">+1 Anguilla</option>
    <option value="">+672 Antarctica</option>
    </select>
    </div>
    <div class="margin-tbr" style="width: 30%;">
    <input type="text" class="input-tag" id="" name="" placeholder="">
    </div>
    <div style="width: 20%;">
    
    </div>
    <div class="margin-tbr" style="width: 15%;">
    <i class="fa-solid fa-trash-can cursor-pointer btn-scale" onclick="removePhoneField(this)"></i>
    </div>
    
    </div>
    </div>
    </div>
    
    
    <div class="fax-field" style="margin-top: 0.5rem;">
    <label class="font-dark" for="" style="font-weight: 700;">Fax <i
    class="fa-solid fa-circle-plus cursor-pointer btn-scale" onclick="addFaxField(this)"></i></label>
    <div class="fax-field-container">
    <div class="d-flex fax-field-lable border-bottom">
    <div class="d-flex w-100">
    <div class="margin-tbr" style="width: 15%; padding-left: 0.1rem;">
    <label for="">Code</label>
    </div>
    <div class="margin-tbr" style="width: 30%; padding-left: 0.1rem;">
    <label for="">Number</label>
    </div>
    <div class="margin-tbr" style="width: 20%; padding-left: 0.1rem;">
    
    </div>
    </div>
    </div>
    <div class="d-flex fax-field-input" style="align-items: center;">
    
    <div class="margin-tbr" style="width: 15%;">
    <input type="text" class="input-tag" id="" name="" placeholder="">
    </div>
    <div class="margin-tbr" style="width: 35%;">
    <input type="text" class="input-tag" id="" name="" placeholder="">
    </div>
    <div class="margin-tbr" style="width: 25%;">
    <i class="fa-solid fa-trash-can cursor-pointer btn-scale" onclick="removeFaxField(this)"></i>
    </div>
    
    </div>
    </div>
    </div>
    
    
    
    <div class="email-field" style="width: 66%;" class="margin-tbr">
    <div style="margin-top: 0.5rem;">
    <label class="font-dark" for="" style="font-weight: 700;">Email <i
    class="fa-solid fa-circle-plus cursor-pointer btn-scale" onclick="addEmailField(this)"></i></label>
    </div>
    <div class="email-input">
    <div class="d-flex single-email d-center">
    
    </div>
    </div>
    
    </div>
    <div class="website-field" style="width: 66%;" class="margin-tbr">
    <div style="margin-top: 0.5rem;">
    <label class="font-dark" for="" style="font-weight: 700;">Website <i
    class="fa-solid fa-circle-plus cursor-pointer btn-scale" onclick="addWebsiteField(this)"></i></label>
    </div>
    <div class="website-input">
    <div class="d-flex d-center single-website">
    
    </div>
    </div>
    
    </div>
    </div>
    </fieldset>
    </div>`;
    document.getElementById('contact-detail-form').insertAdjacentHTML('beforeend', contactFormDetailHTML);
}

function addAddressField(addaddressbtn){
    const addressFieldstr = `<div id="address-field">
    <div class="street-field" style="width: 66%;">
    <div>
    <label for="">Street</label>
    </div>
    <div>
    <input type="text" class="input-tag" id="" name="" placeholder="">
    </div>
    </div>
    <div class="address-field d-flex">
    <div class="margin-tbr" style="width: 25%;">
    <div>
    <label for="">Zip</label>
    </div>
    <div class="">
    <input type="text" class="input-tag" id="" name="" placeholder="">
    </div>
    </div>
    <div class="margin-tbr" style="width: 25%;">
    <div>
    <label for="">City</label>
    </div>
    <div>
    <input type="text" class="input-tag" id="" name="" placeholder="">
    </div>
    </div>
    <div class="margin-tbr" style="width: 20%;">
    <div>
    <label for="">State</label>
    </div>
    <div>
    <select name="" id="" class="select-option">
    <option value="">Washington</option>
    <option value="">Alabama</option>
    <option value="">Alaska</option>
    <option value="">Arizona</option>
    </select>
    </div>
    </div>
    <div class="margin-tbr" style="width: 20%;">
    <div>
    <label for="">Country</label>
    </div>
    <div>
    <select name="" id="" class="select-option">
    <option value="">US</option>
    <option value="">India</option>
    <option value="">Australia</option>
    <option value="">US</option>
    </select>
    </div>
    </div>
    <div class="margin-tbr" style="width: 10%;">
    <i class="fa-solid fa-trash-can cursor-pointer btn-scale" onclick="removeAddressField(this)"></i>
    </div>
    </div>
    </div>`;
    addaddressbtn.closest('.contact-container').querySelector('.address-section').insertAdjacentHTML('beforeend', addressFieldstr);
    addaddressbtn.closest('.contact-container').querySelector('#add-address-btn').style.display = 'none';
}

function removeAddressField(removeaddressbtn){
    removeaddressbtn.closest('.contact-container').querySelector('#add-address-btn').style.display = 'inline-block';
    removeaddressbtn.closest('#address-field').remove();
}

function addPhoneField(addphonebtn){
    const addphonefieldinputstr = `<div class="d-flex d-center phone-input">
    <div class="margin-tbr" style="width: 20%;">
    <select name="" id="" class="select-option">
    <option value="">Cell</option>
    <option value="">Landline</option>
    </select>
    </div>
    <div class="margin-tbr" style="width: 20%;">
    <select name="" id="" class="select-option">
    <option value="">+1 United States</option>
    <option value="">+1 Puerto Rico</option>
    <option value="">+93 Afghanistan</option>
    <option value="">+355 Albania</option>
    <option value="">+213 Algeria</option>
    <option value="">+1 American Samoa</option>
    <option value="">+376 Andorra</option>
    <option value="">+244 Angola</option>
    <option value="">+1 Anguilla</option>
    <option value="">+672 Antarctica</option>
    </select>
    </div>
    <div class="margin-tbr" style="width: 30%;">
    <input type="text" class="input-tag" id="" name="" placeholder="">
    </div>
    <div style="width: 20%;">
    
    </div>
    <div class="margin-tbr" style="width: 15%;">
    <i class="fa-solid fa-trash-can cursor-pointer btn-scale" onclick="removePhoneField(this)"></i>
    </div>
    
    </div>`;
    const addphonefieldlablestr = `<div class="d-flex w-100 border-bottom phone-lable">
    <div class="margin-tbr" style="width: 20%; padding-left: 0.1rem;">
    <label for="">Type</label>
    </div>
    <div class="margin-tbr" style="width: 20%; padding-left: 0.1rem;">
    <label for="">Code</label>
    </div>
    <div class="margin-tbr" style="width: 30%; padding-left: 0.2rem;">
    <label for="">Number</label>
    </div>
    <div class="margin-tbr" style="width: 20%; padding-left: 0.1rem;">
    <label for="">Ext.</label>
    </div>
    <div class="margin-tbr" style="width: 15%; padding-left: 0.1rem;">
    
    </div>
    </div>`;
    if(addphonebtn.closest('.phone-form').querySelector('.phone-field').childElementCount == 0){
        addphonebtn.closest('.phone-form').querySelector('.phone-field').insertAdjacentHTML('beforeend', addphonefieldlablestr);
    }
    addphonebtn.closest('.phone-form').querySelector('.phone-field').insertAdjacentHTML('beforeend', addphonefieldinputstr);
}
function removePhoneField(removephonebtn){
    
    if(removephonebtn.closest('.phone-form').querySelector('.phone-field').childElementCount == 2){
        removephonebtn.closest('.phone-form').querySelector('.phone-field').innerHTML = '';
    }
    removephonebtn.closest('.phone-input').remove();
}

function addFaxField(addfaxfieldbtn){
    const addfaxfieldlablestr =`<div class="d-flex fax-field-lable border-bottom">
    <div class="d-flex w-100">
    <div class="margin-tbr" style="width: 15%; padding-left: 0.1rem;">
    <label for="">Code</label>
    </div>
    <div class="margin-tbr" style="width: 30%; padding-left: 0.1rem;">
    <label for="">Number</label>
    </div>
    <div class="margin-tbr" style="width: 20%; padding-left: 0.1rem;">
    
    </div>
    </div>
    </div>`;
    const addfaxfieldinputstr =`<div class="d-flex fax-field-input" style="align-items: center;">
    
    <div class="margin-tbr" style="width: 15%;">
    <input type="text" class="input-tag" id="" name="" placeholder="">
    </div>
    <div class="margin-tbr" style="width: 35%;">
    <input type="text" class="input-tag" id="" name="" placeholder="">
    </div>
    <div class="margin-tbr" style="width: 25%;">
    <i class="fa-solid fa-trash-can cursor-pointer btn-scale" onclick="removeFaxField(this)"></i>
    </div>
    
    </div>`;
    
    if(addfaxfieldbtn.closest('.fax-field').querySelector('.fax-field-container').childElementCount == 0){
        addfaxfieldbtn.closest('.fax-field').querySelector('.fax-field-container').insertAdjacentHTML('beforeend', addfaxfieldlablestr);
    }
    addfaxfieldbtn.closest('.fax-field').querySelector('.fax-field-container').insertAdjacentHTML('beforeend', addfaxfieldinputstr);
}
function removeFaxField(removefaxfieldbtn){
    if(removefaxfieldbtn.closest('.fax-field').querySelector('.fax-field-container').childElementCount == 2){
        removefaxfieldbtn.closest('.fax-field-container').innerHTML = '';
    }
    removefaxfieldbtn.closest('.fax-field-input').remove();
}

function addEmailField(addemailfieldbtn){
    const addemailinputstr = `<div class="d-flex d-center single-email">
    <div class="w-100">
    <input type="text" class="input-tag" id="" name="" placeholder="">
    </div>
    <div style="margin-left: 0.5rem;">
    <i class="fa-solid fa-trash-can cursor-pointer btn-scale" onclick="removeEmailField(this)"></i>
    </div>
    </div>`;
    addemailfieldbtn.closest('.email-field').querySelector('.email-input').insertAdjacentHTML('beforeend', addemailinputstr);
    
}
function removeEmailField(removeemailfieldbtn){
    removeemailfieldbtn.closest('.single-email').remove();
}

function addWebsiteField(addemailfieldbtn){
    const addemailinputstr = `<div class="d-flex d-center single-website">
    <div class="w-100">
    <input type="text" class="input-tag" id="" name="" placeholder="">
    </div>
    <div style="margin-left: 0.5rem;">
    <i class="fa-solid fa-trash-can cursor-pointer btn-scale" onclick="removeWebsiteField(this)"></i>
    </div>
    </div>`;
    addemailfieldbtn.closest('.website-field').querySelector('.website-input').insertAdjacentHTML('beforeend', addemailinputstr);
    
}
function removeWebsiteField(removeemailfieldbtn){
    removeemailfieldbtn.closest('.single-website').remove();
}

// This fuction remove the contact detail part.
function removeContactForm(deleteBtn){
    deleteBtn.closest('.contact-detail-form').remove();
}

// This function is used for open or close the side menu.
function closeSideMenu(){
    const sidemenuclosebtn = document.getElementById('side-menu-close-btn').classList;
    const leftsidenav = document.getElementById('leftsidenav');
    if(sidemenuclosebtn.contains('fa-angle-left')){
        sidemenuclosebtn.remove('fa-angle-left');
        sidemenuclosebtn.add('fa-angle-right');
        leftsidenav.style.width = "1%";
    }
    else
    {
        sidemenuclosebtn.remove('fa-angle-right');
        sidemenuclosebtn.add('fa-angle-left');
        leftsidenav.style.width = "13%";
    }
    
}

// This function is used for open the other information part.
function openOtherInfoForm(){
    const otherformopenbtn = document.getElementById('other-info-btn').classList;
    const patientotherinfo = document.getElementById('patient-other-info-form');
    if(otherformopenbtn.contains('fa-circle-chevron-down')){
        otherformopenbtn.remove('fa-circle-chevron-down');
        otherformopenbtn.add('fa-circle-chevron-right');
        // patientotherinfo.style.transition = "height 1s";
        patientotherinfo.style.height = "3.5rem";
    }
    else
    {
        otherformopenbtn.remove('fa-circle-chevron-right');
        otherformopenbtn.add('fa-circle-chevron-down');
        // patientotherinfo.style.transition = "height 1s";
        patientotherinfo.style.height = "100%";
    }
}
