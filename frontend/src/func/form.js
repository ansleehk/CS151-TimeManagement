
/**
 * @author Michael Berkowski
 * @see https://stackoverflow.com/questions/8563240/how-to-get-all-checked-checkboxes
 */
export function getCheckedBoxValues(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    var checkBoxValue = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) {
       // And stick the checked ones onto an array...
       if (checkboxes[i].checked) {
        checkBoxValue.push(checkboxes[i].value);
       }
    }
    // Return the array if it is non-empty, or null
    return checkBoxValue.length > 0 ? checkBoxValue : null;
  }
  