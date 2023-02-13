import React from 'react';

const Header = ({course}) => {
    return(
        <h1>{course.name}</h1>
    )
}
const Part = ({course}) => {

    return(
        <p>
            {course.name}  {course.exercises}
        </p>
    )
}
const Content = ({course}) => {
    return (
        <div>
            {course.map(courses =>
                <Part key={courses.id} course={courses}/>)}
        </div>
    )
}
const Total = ({course}) => {
    const total = course.parts.reduce((s, p) => s + p.exercises,0   )
        //console.log('what is happening', s, p)


    return (
        <div>
           <p>total of {total} exercises</p>
        </div>
    )
}


const Course = ({course}) => {

    return (
        <div>
            <Header course={course}></Header>
            <Content course={course.parts}></Content>
            <Total course={course}></Total>
        </div>
    )
}


export default Course