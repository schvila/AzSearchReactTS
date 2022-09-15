import axios from "axios";

export default  async function GetRelationships() {
    const formName = 'relationshipGetForm'

      const formElement = window.document.getElementById(formName);
      if (!formElement) {
        console.error('Save failed. Form not found', formName);
        return { status: 'error' };
      }
      const dcPageField: HTMLInputElement | undefined = formElement
      .getElementsByTagName('input')
      .namedItem('__Kentico_DC_Page') as HTMLInputElement;
      const formAction = formElement.getAttribute('action') as string;
      const b = {
        __Kentico_DC_Page: dcPageField.value
      };
      
      let response = await axios.post(formAction,
        { __Kentico_DC_Page: dcPageField.value },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      
      console.log({relations: response.data.value});

}

