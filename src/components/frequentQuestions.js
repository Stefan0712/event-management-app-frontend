import { useState } from "react";


const FrequentQuestions = () => {

    const [expandedQuestion, setExpandedQuestion] = useState(-1)
    const [questions, setQuestions] = useState([
        {
          name: "What is APPNAME?",
          content: "APPNAME is a versatile event management application designed to simplify the process of organizing, discovering, and participating in various events. Whether it's a small gathering, a virtual meetup, or a large-scale concert, APPNAME provides users with the tools to create, manage, and join events effortlessly."
        },
        {
          name: "What categories of events does the app support?",
          content: "APPNAME supports a wide range of event categories, including but not limited to casual meetups, game nights, BBQs, birthday parties, professional networking events, concerts, virtual events, and much more. The app is designed to accommodate events of all sizes and types to cater to diverse user interests."
        },
        {
          name: "Can I transfer event ownership to another participant?",
          content: "Yes, you can transfer event ownership to another participant. In the event management settings, there is an option to transfer ownership. Simply select the participant to whom you want to transfer ownership, and they will gain control of the event details and management capabilities."
        },
        {
          name: "What privacy settings are available for my event?",
          content: "APPNAME provides flexible privacy settings for your events. You can choose between public, private, or invite-only settings. Public events are visible to all users, private events require an invitation to join, and invite-only events are accessible only to those who receive a direct invitation from the event host."
        },
        {
          name: "Can I review and rate events I've attended?",
          content: "Yes, after attending an event, you can share your experience by providing a review and rating. This feedback helps other users make informed decisions when considering attending similar events. Your reviews contribute to building a vibrant and trustworthy community within the app."
        },
        {
          name: "Can I export participant lists for my events?",
          content: "Certainly! You have the option to export participant lists for your events. This feature is available in the event management tools, allowing you to download a list of attendees, their contact information, and any other relevant details for your records or further analysis."
        }
    ])

    const expandQuestion = (index) =>{
        if(index === expandedQuestion){
            setExpandedQuestion(-1)
        }else{
            setExpandedQuestion(index)
        }
    }
    return ( 
        <div className="frequent-questions">
            {questions.map((question, index)=>(
                <div className={`question-body ${index === expandedQuestion ? "expand-question" : ""}`} key={index} onClick={()=>expandQuestion(index)}>
                    <div className="question-header"><h3>{question.name}</h3></div>
                    <div className="question-content"><p>{question.content}</p></div>
                </div>
            ))}
        </div>
     );
}
 
export default FrequentQuestions;