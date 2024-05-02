
1. Student Object:

Fields:
Name (Field Label: Name, Data Type: Text)
Roll Number (Field Label: Roll Number, Data Type: Text)
Email (Field Label: Email, Data Type: Email)
Date of Birth (Field Label: Date of Birth, Data Type: Date)
Gender (Field Label: Gender, Data Type: Picklist)
Relationships:
Enrollments (Related Object: Course, Relationship Type: Master-Detail)

2. Course Object:

Fields:
Course Name (Field Label: Course Name, Data Type: Text)
Course Code (Field Label: Course Code, Data Type: Text)
Teacher (Field Label: Teacher, Data Type: Lookup Relationship to Teacher)

3. Class Object:

Fields:
Class Name (Field Label: Class Name, Data Type: Text)
Class Code (Field Label: Class Code, Data Type: Text)
Room Number (Field Label: Room Number, Data Type: Text)
Schedule (Field Label: Schedule, Data Type: Textarea)
Course (Field Label: Course, Data Type: Lookup Relationship to Course)
Relationships:
Enrolled Students (Related Object: Student, Relationship Type: Master-Detail)

4. Teacher
Fields:
Name (Field Label: Name, Data Type: Text)
Employee ID (Field Label: Employee ID, Data Type: Text)
Relationships:
Courses Taught (Related Object: Course, Relationship Type: Master-Detail)



1. Sample Entries for Student Object:

Name: Alice Johnson
Roll Number: S001
Email: alice.johnson@example.com
Date of Birth: 2000-05-10
Gender: Female
Enrollments: [Related to Course: "Introduction to Biology"]
Name: Bob Smith
Roll Number: S002
Email: bob.smith@example.com
Date of Birth: 1998-11-25
Gender: Male
Enrollments: [Related to Course: "Introduction to Computer Science"]
2. Sample Entries for Course Object:

Course Name: Introduction to Biology
Course Code: BIO101
Teacher: [Lookup to Teacher: "Dr. Emily Parker"]
Course Name: Introduction to Computer Science
Course Code: CS101
Teacher: [Lookup to Teacher: "Mr. John Anderson"]
3. Sample Entries for Class Object:

Class Name: Biology 101
Class Code: BIO101-A
Room Number: 101
Schedule: Monday & Wednesday, 9:00 AM - 10:30 AM
Course: [Lookup to Course: "Introduction to Biology"]
Enrolled Students: [Related to Students: "Alice Johnson"]
Class Name: Computer Science 101
Class Code: CS101-A
Room Number: 102
Schedule: Tuesday & Thursday, 11:00 AM - 12:30 PM
Course: [Lookup to Course: "Introduction to Computer Science"]
Enrolled Students: [Related to Students: "Bob Smith"]
4. Sample Entries for Teacher Object:

Name: Dr. Emily Parker
Employee ID: T001
Courses Taught: [Related to Courses: "Introduction to Biology"]
Name: Mr. John Anderson
Employee ID: T002
Courses Taught: [Related to Courses: "Introduction to Computer Science"]