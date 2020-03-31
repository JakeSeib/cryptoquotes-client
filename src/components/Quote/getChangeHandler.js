const getChangeHandler = (attrGetter, attrSetter) =>
  // returns an event handler with the provided state attribute getter and
  // setter. State attribute should be an object
  function (event) {
    // create a new object with key of `name` property on input and
    // value with `value` property
    const updatedField = {
      // key in square brackets because it's a variable
      [event.target.name]: event.target.value
    }
    // combine the current attrGetter with updatedField using `Object.assign` method
    // use spread operator to avoid editing state directly
    const editedState = Object.assign({ ...attrGetter }, updatedField)
    // set the state
    attrSetter(editedState)
  }

export default getChangeHandler
