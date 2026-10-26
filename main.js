
let students = [];

if (localStorage.getItem("students")) {
    students = JSON.parse(localStorage.getItem("students"));
}

displayArray();

// Add / Update

studentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const studentIdInput = studentID.value;
    const studentNameInput = studentName.value;
    const studentCourseInput = studentCourse.value;

    if (studentIdInput && studentNameInput && studentCourseInput) {

        const edit = editStatus.value;

        if (edit === "") {
            students.push({
                studentID: studentIdInput,
                studentName: studentNameInput,
                studentCourse: studentCourseInput
            });
        } else {
            students[edit] = {
                studentID: studentIdInput,
                studentName: studentNameInput,
                studentCourse: studentCourseInput
            };

            editStatus.value = "";
        }

        localStorage.setItem("students", JSON.stringify(students));
        studentForm.reset();
        displayArray();

    } else {
        alert("Please fill the form completely");
    }
});

// Display

function displayArray() {
    tableBody.innerHTML = "";

    students.forEach((item, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.studentID}</td>
                <td>${item.studentName}</td>
                <td>${item.studentCourse}</td>
                <td>
                    <button onclick="editStudent(${index})"
                        class="btn btn-warning">Edit</button>

                    <button onclick="deleteStudent(${index})"
                        class="btn btn-danger">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Delete

function deleteStudent(studentIndex) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(studentIndex, 1);

        localStorage.setItem("students", JSON.stringify(students));
        displayArray();
    }
}

// Edit

function editStudent(studentIndex) {
    const studentDetails = students[studentIndex];
    studentID.value = studentDetails.studentID;
    studentName.value = studentDetails.studentName;
    studentCourse.value = studentDetails.studentCourse;
    editStatus.value = studentIndex;
}

// Search by Course

searchCourse.addEventListener("input", () => {

    const course = searchCourse.value.toLowerCase();
    tableBody.innerHTML = "";
    students.forEach((item, index) => {
        if (item.studentCourse.toLowerCase().includes(course)) {
            tableBody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.studentID}</td>
                    <td>${item.studentName}</td>
                    <td>${item.studentCourse}</td>
                    <td>
                        <button onclick="editStudent(${index})"
                            class="btn btn-warning">Edit</button>

                        <button onclick="deleteStudent(${index})"
                            class="btn btn-danger">Delete</button>
                    </td>
                </tr>
            `;
        }
    });

});
