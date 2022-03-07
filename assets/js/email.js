
// initialize the validation library
const validation = new JustValidate('#contactForm', {
    errorFieldCssClass: 'is-invalid',
    errorLabelStyle: {
        fontSize: '14px',
        color: '#dc3545',
    },
    focusInvalidField: true,
    lockForm: true,
    tooltip: {
        position: 'top',
    },
});






let submitBtn = document.querySelector('#form-submit')

submitBtn.addEventListener("click", (e) => {
    console.log("t")
    let name = document.querySelector('#name');
    let message = document.querySelector('#message');
    let lastName = document.querySelector('#L_name');
    let email = document.querySelector('#email');


    // apply rules to form fields
    validation
        .addField('#name', [
            {
                rule: 'minLength',
                value: 2,
                errorMessage: 'Im sure your name is more than 1 char..',

            },
            {
                rule: 'maxLength',
                value: 30,
                errorMessage: 'Thats a long @$$ name..',

            },
            {
                rule: 'required',
                errorMessage: 'Name is required',
            }
        ]

        )
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Email is required',
            },
            {
                rule: 'email',
                errorMessage: 'Email is invalid!',
            },
        ])

        .addField('#message', [
            {
                rule: 'required',
                errorMessage: 'Say something...',
            },
            {
                rule: 'minLength',
                value: 3,
            }, {
                rule: 'maxLength',
                value: 500,
            },
        ])

        .onSuccess(() => {
            fetch("https://formsubmit.co/ajax/thefilocoder@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: "Portfolio email",
                    message: `${name.value} ${lastName.value} - ${email.value} wrote: ${message.value} `
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === "true") {
                        $("#thankYouModal").modal();
                    }
                    else {
                        $("#emailFailed").modal();
                    }
                })
                .catch(error => console.log(error));
        });

})