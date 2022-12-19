const form = document.getElementById('patient-info-form');
const resetBtn = document.getElementById('resetbtn');
form.addEventListener('submit', saveFormData);
resetBtn.addEventListener('click', resetFormData);
const contactFormDetailHTML = `<div class="contact-detail-form">
                                                <fieldset>
                                                    <legend><select name="" id="" class="select-option" style="width: 10rem;">
                                                        <option value="">Home</option>
                                                        <option value="">Work</option>
                                                        <option value="" selected>Other</option>
                                                    </select></legend>
                                                    <div class="contact-container">
                                                        <div class="address-header d-flex w-100" style="justify-content: space-between; margin-bottom: 0.5rem;">
                                                            <div>
                                                                <span style="font-weight: 700; font-size: 1rem;">Address</span>
                                                            </div>
                                                            <div class="right-align-item">
                                                                <i class="fa-solid fa-trash-can" onclick="removeContactForm(this)"></i>
                                                            </div>
                                                        </div>
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
                                                                <i class="fa-solid fa-trash-can"></i>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <span style="font-weight: 700;">Phone <i class="fa-solid fa-circle-plus"></i></span>
                                                        </div>
                                                        <div class="address-field d-flex">
                                                            <div class="w-100 margin-tbr" style="width: 30%;">
                                                                <div>
                                                                    <label for="">Type</label>
                                                                </div>
                                                                <div class="">
                                                                    <select name="" id="" class="select-option">
                                                                        <option value="">Washington</option>
                                                                        <option value="">Alabama</option>
                                                                        <option value="">Alaska</option>
                                                                        <option value="">Arizona</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="w-100 margin-tbr" style="width: 15%;">
                                                                <div>
                                                                    <label for="">Code</label>
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
                                                            <div class="margin-tbr" style="width: 30%;">
                                                                <div>
                                                                    <label for="">Number</label>
                                                                </div>
                                                                <div>
                                                                    <input type="text" class="input-tag" id="" name="" placeholder="">
                                                                </div>
                                                            </div>
                                                            <div class="margin-tbr" style="width: 30%;">
                                                                <div>
                                                                    <label for="">Ext.</label>
                                                                </div>
                                                                <div>
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="margin-tbr" >
                                                                <div style="height: 1.5rem;">
                                                                   
                                                                </div>
                                                                <div>
                                                                    <i class="fa-solid fa-trash-can"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="street-field" style="width: 66%;">
                                                            <div>
                                                                <label for="" style="font-weight: 700;">Fax <i class="fa-solid fa-circle-plus"></i></label>
                                                            </div>
                                                            <div>
                                                                <input type="text" class="input-tag" id="" name="" placeholder="" hidden>
                                                            </div>
                                                        </div>
                                                        <div class="street-field" style="width: 66%;" class="margin-tbr">
                                                            <div style="margin-top: 0.5rem;">
                                                                <label for="" style="font-weight: 700;">Email <i class="fa-solid fa-circle-plus"></i></label>
                                                            </div>
                                                            <div class="d-flex d-center">
                                                                <div class="w-100">
                                                                    <input type="text" class="input-tag" id="" name="" placeholder="">
                                                                </div>
                                                                <div style="margin-left: 0.5rem;">
                                                                    <i class="fa-solid fa-trash-can"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="street-field" style="width: 66%;" class="margin-tbr">
                                                            <div style="margin-top: 0.5rem;">
                                                                <label for="" style="font-weight: 700;">Website <i class="fa-solid fa-circle-plus"></i></label>
                                                            </div>
                                                            <div class="d-flex d-center d-none">
                                                                <div class="w-100">
                                                                    <input type="text" class="input-tag" id="" name="" placeholder="" >
                                                                </div>
                                                                <div style="margin-left: 0.5rem;">
                                                                    <i class="fa-solid fa-trash-can"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>`;

function saveFormData(event) {
    
    event.preventDefault();
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const sex = document.getElementById('sex').value;
    const dob = document.getElementById('dob').value;
    
    if(fname != "" && lname != "" && sex != ""){
        
        var dob2 = new Date(dob);
        var ageDifMs = Date.now() - dob2.getTime();
        var ageDate = new Date(ageDifMs);
        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
        
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
    else
    {
        alert('Please Enter All Required Details');
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