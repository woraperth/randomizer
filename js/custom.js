var app = new Vue({
    el: '#app',
    data: {
        title: 'Who will present first?',
        subtitle: 'Make randomization fun again, since 2018',
        step: 1,
        student_list: [],
        student_order: []
    },
    methods: {
        // When click on start button
        clickStart: function(ev) {
            let el = document.querySelector("#stulist")
            let stulist_text = el.value.trim()
            // Store unique & shuffled array
            this.student_list = [...new Set( shuffle( stulist_text.split("\n") ) )]
            this.step = 2
        },
        // When click on student name
        chooseStudent: function(stu) {
            if(!this.isChosen(stu)) {
                this.student_order.push( stu )

                // Move to the next step
                if(this.student_list.length === this.student_order.length) {
                    this.step = 3
                }
            }
        },
        // When listing student name
        showStudentName: function(stu) {
            // Find part of student character
            while(true) {
                let randChar = stu.charAt(Math.floor(Math.random() * stu.length))
                if(randChar.match(/[a-z]/i)) return randChar.toUpperCase()
            }
        },
        // Check if the student is chosen
        isChosen: function(stu) {
            return !(this.student_order.indexOf(stu) === -1);
        },
        // Click reset button
        resetOrder: function(ev) {
            let do_reset = confirm('Are you sure you would like to reset order?')
            if(do_reset) {
                this.student_order = []
            }
        }
    }
})

// -- Misc functions

// Reference: Jeff at https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
// Unbias array shuffle
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}