const form = document.getElementById('patient-info-form');
const resetBtn = document.getElementById('resetbtn');
// const formcontainer = document.getElementsByClassName('patient-form-container');
form.addEventListener('submit', saveFormData);
resetBtn.addEventListener('click', resetFormData);
// formcontainer.addEventListener('scroll', addshadow);
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
                                                                                class="fa-solid fa-circle-plus cursor-pointer d-none" id="add-address-btn"
                                                                                onclick=" addAddressField(this)"></i></span>
                                                                    </div>
                                                                    <div class="right-align-item">
                                                                        <i class="fa-solid fa-trash-can cursor-pointer" onclick="removeContactForm(this)"></i>
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
                                                                        <div class="w-100 margin-tbr">
                                                                            <div>
                                                                                <label for="">Zip</label>
                                                                            </div>
                                                                            <div class="">
                                                                                <input type="text" class="input-tag" id="" name="" placeholder="">
                                                                            </div>
                                                                        </div>
                                                                        <div class="w-100 margin-tbr">
                                                                            <div>
                                                                                <label for="">City</label>
                                                                            </div>
                                                                            <div>
                                                                                <input type="text" class="input-tag" id="" name="" placeholder="">
                                                                            </div>
                                                                        </div>
                                                                        <div class="margin-tbr">
                                                                            <div>
                                                                                <label for="">State</label>
                                                                            </div>
                                                                            <div>
                                                                                <select name="" id="" class="select-option" style="width: 5rem;">
                                                                                    <option value="">Washington</option>
                                                                                    <option value="">Alabama</option>
                                                                                    <option value="">Alaska</option>
                                                                                    <option value="">Arizona</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="margin-tbr">
                                                                            <div>
                                                                                <label for="">Country</label>
                                                                            </div>
                                                                            <div>
                                                                                <select name="" id="" class="select-option" style="width: 5rem;">
                                                                                    <option value="">US</option>
                                                                                    <option value="">India</option>
                                                                                    <option value="">Australia</option>
                                                                                    <option value="">US</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="margin-tbr">
                                                                            <i class="fa-solid fa-trash-can cursor-pointer" onclick="removeAddressField(this)"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                    
                                                                <div class="phone-form">
                                                                    <span class="font-dark" style="font-weight: 700;">Phone <i
                                                                            class="fa-solid fa-circle-plus cursor-pointer" onclick="addPhoneField(this)"></i></span>
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
                                                                                <i class="fa-solid fa-trash-can cursor-pointer" onclick="removePhoneField(this)"></i>
                                                                            </div>
                                                                    
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                
                                                                <div class="fax-field" style="margin-top: 0.5rem;">
                                                                    <label class="font-dark" for="" style="font-weight: 700;">Fax <i
                                                                            class="fa-solid fa-circle-plus cursor-pointer" onclick="addFaxField(this)"></i></label>
                                                                    <div class="fax-field-container">
                                                                        
                                                                    </div>
                                                                </div>



                                                                <div class="email-field" style="width: 66%;" class="margin-tbr">
                                                                    <div style="margin-top: 0.5rem;">
                                                                        <label class="font-dark" for="" style="font-weight: 700;">Email <i
                                                                                class="fa-solid fa-circle-plus cursor-pointer" onclick="addEmailField(this)"></i></label>
                                                                    </div>
                                                                    <div class="email-input">
                                                                        <div class="d-flex single-email d-center">
                                                                            <div class="w-100">
                                                                                <input type="text" class="input-tag" id="" name="" placeholder="">
                                                                            </div>
                                                                            <div style="margin-left: 0.5rem;">
                                                                                <i class="fa-solid fa-trash-can cursor-pointer" onclick="removeEmailField(this)"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div class="website-field" style="width: 66%;" class="margin-tbr">
                                                                    <div style="margin-top: 0.5rem;">
                                                                        <label class="font-dark" for="" style="font-weight: 700;">Website <i
                                                                                class="fa-solid fa-circle-plus cursor-pointer" onclick="addWebsiteField(this)"></i></label>
                                                                    </div>
                                                                    <div class="website-input">
                                                            
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    </div>`;
const userdob = document.getElementById('dob');
var age;
userdob.addEventListener('change',getAge);
function getAge(){
    var dob = new Date(userdob.value);
    var nowdate = new Date();
    age = nowdate.getFullYear() - dob.getFullYear();
    document.getElementById('age').innerHTML = `${age}Y`;

}
function saveFormData(event) {
    
    event.preventDefault();
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const sex = document.getElementById('sex').value;

    if(fname != ""){
        if(lname != ""){
            if(sex != ""){
                if(age > 18){
                    const myFormData = new FormData(event.target);
                    const formDataObj = {};
                    myFormData.forEach((value, key) => (formDataObj[key] = value));
                    console.log(formDataObj);
                    // console.log(myFormData);
                }
                else{
                    alert('Please Fillup The Contact Form');
                }
            }
            else{
                document.getElementById('require-sex').innerHTML = 'Please Enter Sex'
            }
        }
        else{
            document.getElementById('require-lname').innerHTML = 'Please Enter Last Name'
        }
    }
    else{
        document.getElementById('require-fname').innerHTML = 'Please Enter First Name';
    }
    
}

function resetFormData(){
    if(confirm('Are you sure, You want reset form ?')){
        form.reset();
    }
}

function addContactDetailFrom(){
 
    document.getElementById('contact-detail-form').innerHTML +=contactFormDetailHTML;
}

function removeContactForm(deleteBtn){
    deleteBtn.closest('.contact-detail-form').remove();
}

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
        leftsidenav.style.width = "16%";
    }
    
}

function openOtherInfoForm(){
    const otherformopenbtn = document.getElementById('other-info-btn').classList;
    const patientotherinfo = document.getElementById('patient-other-info-form');
    if(otherformopenbtn.contains('fa-circle-chevron-down')){
        otherformopenbtn.remove('fa-circle-chevron-down');
        otherformopenbtn.add('fa-circle-chevron-right');
        // patientotherinfo.style.transition = "height 1s";
        patientotherinfo.style.height = "4rem";
    }
    else
    {
        otherformopenbtn.remove('fa-circle-chevron-right');
        otherformopenbtn.add('fa-circle-chevron-down');
        // patientotherinfo.style.transition = "height 1s";
        patientotherinfo.style.height = "100%";
    }
}

function addAddressField(addaddressbtn){
    const addressFieldstr = `<div class="street-field" style="width: 66%;">
                                                                        <div>
                                                                            <label for="">Street</label>
                                                                        </div>
                                                                        <div>
                                                                            <input type="text" class="input-tag" id="" name="" placeholder="">
                                                                        </div>
                                                                    </div>
                                                                    <div class="address-field d-flex">
                                                                        <div class="w-100 margin-tbr">
                                                                            <div>
                                                                                <label for="">Zip</label>
                                                                            </div>
                                                                            <div class="">
                                                                                <input type="text" class="input-tag" id="" name="" placeholder="">
                                                                            </div>
                                                                        </div>
                                                                        <div class="w-100 margin-tbr">
                                                                            <div>
                                                                                <label for="">City</label>
                                                                            </div>
                                                                            <div>
                                                                                <input type="text" class="input-tag" id="" name="" placeholder="">
                                                                            </div>
                                                                        </div>
                                                                        <div class="margin-tbr">
                                                                            <div>
                                                                                <label for="">State</label>
                                                                            </div>
                                                                            <div>
                                                                                <select name="" id="" class="select-option" style="width: 5rem;">
                                                                                    <option value="">Washington</option>
                                                                                    <option value="">Alabama</option>
                                                                                    <option value="">Alaska</option>
                                                                                    <option value="">Arizona</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="margin-tbr">
                                                                            <div>
                                                                                <label for="">Country</label>
                                                                            </div>
                                                                            <div>
                                                                                <select name="" id="" class="select-option" style="width: 5rem;">
                                                                                    <option value="">US</option>
                                                                                    <option value="">India</option>
                                                                                    <option value="">Australia</option>
                                                                                    <option value="">US</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="margin-tbr">
                                                                            <i class="fa-solid fa-trash-can cursor-pointer" onclick="removeAddressField(this)"></i>
                                                                        </div>
                                                                    </div>`;
    addaddressbtn.closest('.contact-container').querySelector('#address-field').innerHTML += addressFieldstr;
    document.getElementById('add-address-btn').style.display = 'none';
}

function removeAddressField(removeaddressbtn){
    removeaddressbtn.closest('.contact-container').querySelector('#add-address-btn').style.display = 'inline-block';
    removeaddressbtn.closest('#address-field').innerHTML = '';
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
                                                                                <i class="fa-solid fa-trash-can cursor-pointer" onclick="removePhoneField(this)"></i>
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
        addphonebtn.closest('.phone-form').querySelector('.phone-field').innerHTML += addphonefieldlablestr;
    }
    addphonebtn.closest('.phone-form').querySelector('.phone-field').innerHTML += addphonefieldinputstr;
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
                                                                                <i class="fa-solid fa-trash-can cursor-pointer" onclick="removeFaxField(this)"></i>
                                                                            </div>
                                                                        
                                                                        </div>`;

    if(addfaxfieldbtn.closest('.fax-field').querySelector('.fax-field-container').childElementCount == 0){
        addfaxfieldbtn.closest('.fax-field').querySelector('.fax-field-container').innerHTML += addfaxfieldlablestr;
    }
    addfaxfieldbtn.closest('.fax-field').querySelector('.fax-field-container').innerHTML += addfaxfieldinputstr;
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
                                                                                <i class="fa-solid fa-trash-can cursor-pointer" onclick="removeEmailField(this)"></i>
                                                                            </div>
                                                                        </div>`;
    addemailfieldbtn.closest('.email-field').querySelector('.email-input').innerHTML += addemailinputstr;

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
                                                                                <i class="fa-solid fa-trash-can cursor-pointer" onclick="removeWebsiteField(this)"></i>
                                                                            </div>
                                                                        </div>`;
    addemailfieldbtn.closest('.website-field').querySelector('.website-input').innerHTML += addemailinputstr;

}
function removeWebsiteField(removeemailfieldbtn){
    removeemailfieldbtn.closest('.single-website').remove();
}