import { measure, removeAttribute, style } from "@splidejs/splide/src/js/utils"
import { useEffect, useRef, useState } from "react"

export default function FormV(){
    const name=useRef()
    const email=useRef()
    const message=useRef()
    const check=useRef()
    const [errors, seterrors] = useState({});
    const [submit , setsubmit] = useState(false)
    const [isvalide, setIsvalid] = useState(true);
    let nameinput
    let emailinput
    let messageinput
    let checkinput  
    const validationelement=(e)=>{
        const terget=e.target
        console.log()
        if(terget.id!='check'){
            if(terget.value.trim()===""){
                seterrors(prevState =>  {
                    return {...prevState,...{ [terget.id] : 'field required' }}
                });
                setIsvalid(false)
            } 
        }
        else{
            if(terget.checked== false){
                seterrors(prevState =>  {
                    return {...prevState,...{ [terget.id] : 'field must be accepted' }}
                });
                setIsvalid(false)
            } 
        }
        
    }
    const ValidateForm = ()=>{
        seterrors({});
        setIsvalid(true) 
        nameinput=name.current.value
        emailinput=email.current.value
        messageinput=message.current.value
        checkinput=check.current.checked 
        

        if(nameinput.trim()===""){
            //name.current.style.border='red 1px solid'
            const fieldName = "name";
            const message="field name is requeierd"
            seterrors(prevState =>  {
                return {...prevState,...{ name : [message] }}
            });
            setIsvalid(false)
        } 
        if(emailinput.trim()===""){
            //name.current.style.border='red 1px solid'
            const message='field email is requeierd'
            const fieldName = 'email';
            seterrors(prevState =>  {
                return {...prevState,...{ email : [message] }}
            });
            setIsvalid(false)
        }else if(!emailinput.match(/^\S+@\S+\.\S+$/)){
            const message=" email is must match abcd@abcd.abcd"
            const fieldName = "email";
            seterrors(prevState =>  {
                return {...prevState,...{ email : [message] }}
            });
            setIsvalid(false)
        }
         if(messageinput.trim()===""){
            //name.current.style.border='red 1px solid'
            const fieldName = "message";
            const message="field message is requeierd at lest 100 "
            seterrors(prevState =>  {
                return {...prevState,...{ message : [message] }}
            });
            setIsvalid(false)
        } else if(messageinput.trim().length <10){
            const x =messageinput.trim().length
            const message=`must add ${100-x} characters`
            seterrors(prevState =>  {
                return {...prevState,...{ message : [message] }}
            });
            setIsvalid(false)
        }
        if(checkinput === false){
            const fieldName = "check";
            //name.current.style.border='red 1px solid'
            const message="condotion must be accepted "
            seterrors(prevState =>  {
                return {...prevState,...{ check : [message] }}
            });

            setIsvalid(false)
        } 
    }
    const handelsubmit=(e)=>{
        e.preventDefault()
        setsubmit(true)
        ValidateForm()
       /*  errors.map((error)=>{
            console.log(error)
        }) */

        
    }
    const resertform =()=>{
        name.current.value = "";
        email.current.value = "";
        message.current.value = "";
        check.current.checked = false;
        console.log("resertform called")
    }
    useEffect(() => {
        console.log("he")
//       ValidateForm()
       Object.entries(errors).map((error)=>{
        const [field , messagee] = error
            if(field=='name'){
                return name.current.style.border='red 1px solid'
            }
            if(field=='email'){
                return email.current.style.border='red 1px solid'
            }
            if(field=='message'){
                return message.current.style.border='red 1px solid'
            }
            if(field=='check'){
                return check.current.style.border='red 1px solid'
            }
        })
        return () => {
            name.current.style.removeProperty('border');
            email.current.style.removeProperty('border');
            message.current.style.removeProperty('border');
            check.current.style.removeProperty('border');
        };
        
    }, [errors]);
  
   const displayerrors =()=>{
    return Object.entries(errors).map((error,key)=>{
        const [field , message] = error
        return <li key={error.field}> {field} : {message}</li>
    })
   }
   const showserrores = (fieldName)=>{
        const error=errors[fieldName]
        if(error!==undefined){
            return <div>         <small style={{ color: 'red' }}>{error}!</small>  </div>
        }
       
   }
    return <>
    <div className="container-fluid w-75 mx-auto my-5 ">
        {/* {JSON.stringify(errors)} */}
        {console.log(errors)}
                 { 
                   submit && (
                    isvalide ? (
                        <div>
                            {resertform()}
                          

                        <div class="p-5 mb-4 bg-light rounded-3">
                            <div class="container-fluid py-5">
                                <h1 class="display-5 fw-bold">Success</h1>
                                <p class="col-md-8 fs-4">
                                Form sent successfully.
                                </p>
                                <a class="btn btn-primary btn-lg" role="button" href=".">
                                    return
                                </a>
                            </div>
                        </div>
                          
                        </div>
                        
                    ) : (
                        <div className="alert alert-danger" role="alert">
                            <ul>
                            {displayerrors()}
                            </ul>
                        
                       </div>
                    )
                )}
        
        <form onSubmit={handelsubmit} >
       
        <h2 className="my-3"> Forme Contact </h2>
        <hr />
        
        <div className="form-outline mb-4">
            <label htmlFor="name" className="form-label"> Name</label>
            <input type="text" name="name" id="name" className="form-control" ref={name} /* onChange={validationelement} */ />
            {showserrores('name')}
        </div>
        <div className="form-outline mb-4">
            <label htmlFor="email" className="form-label"> Email address </label>
            <input type="text" name="email" id="email" className="form-control" ref={email} /* onChange={validationelement} */ />
            {showserrores('email')}
        </div>
        <div className="form-outline mb-4">
            <label htmlFor="message" className="form-label"> Message </label>
            <textarea name="message" id="message" className="form-control" rows={4} ref={message} /* onChange={validationelement} */ ></textarea>
            {showserrores('message')}
        </div>
        <div className="form-outline mb-4">
            <input type="checkbox" name="acceptation" id="acceptation" className="form-check-input me-2" ref={check} /* onChange={validationelement} */ />
            <label htmlFor="acceptation" className="form-check-label "> I accepte all roles </label> 
            {showserrores('check')} 
        </div>

        <input /* disabled={!isvalide}  */type="submit" value="Submit" className="btn btn-primary form-control" />
        
        </form>
        
    </div>
    </>
}