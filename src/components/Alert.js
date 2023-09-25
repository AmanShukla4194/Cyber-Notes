import React from 'react'

function Alert(props) {

  const capitalize = (word) => {
    if(word === "danger"){
        word = "error"
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <>
      <div style={{ height: '50px' }}>
        {/*first this props with alert willbe evaluated if it is null then the rest of the code will not be evaluated*/}
        {props.alert &&
          <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} style={{ backgroundColor: 'light-green' }} role="alert">
            <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}</div>}
        {/* If the type is success then the messsage wiil appear  */}
      </div>
    </>
  )
}

export default Alert
