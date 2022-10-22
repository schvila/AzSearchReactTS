import axios from 'axios';
import { IJsonResult } from './interfaces/IJsonResult';
import IRelationshipNameInfo from './interfaces/IRelationshipNameInfo';
import IRelationships from './interfaces/IRelationships';

const formPartialName = "PageRelationship__Form";

export async function  GetRelationshipNames(): Promise<IRelationshipNameInfo[]> {
  return [];
  // const response = await axios.get('https://localhost:44381/RelationshipNames');
  // return response.data;
}

export async function GetRelationships(): Promise<IRelationships[]> {
  return [];
  // const formName = formPartialName.replace('__', 'Get'); //relationshipGetForm'

  // const formElement = window.document.getElementById(formName);
  // if (!formElement) {
  //   console.error('Save failed. Form not found', formName);
  //   throw new Error(`Save failed. Form "${formName}" not found`);
  // }
  // const dcPageField: HTMLInputElement | undefined = formElement
  //   .getElementsByTagName('input')
  //   .namedItem('__Kentico_DC_Page') as HTMLInputElement;
  // const formAction = formElement.getAttribute('action') as string;

  // const response = await axios.post(
  //   formAction,
  //   { __Kentico_DC_Page: dcPageField.value },
  //   {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   },
  //);
  //console.log({relations: response.data.value});
  //return response.data.value;
}

export async function AddRelations(relationshipName: string, rightNodes: string): Promise<IJsonResult> {
  //const formName = 'relationshipAddForm'
  const formName = formPartialName.replace('__', 'Add');

  const formElement = window.document.getElementById(formName);
  if (!formElement) {
    console.error('Save failed. Form not found', formName);
    throw new Error(`Save failed. Form "${formName}" not found`);
  }
  const dcPageField: HTMLInputElement | undefined = formElement
    .getElementsByTagName('input')
    .namedItem('__Kentico_DC_Page') as HTMLInputElement;
  const formAction = formElement.getAttribute('action') as string;
  const data = {
    relationshipName: relationshipName,
    rightNodes: rightNodes,
  };
  const response = await axios.put(
    formAction,
    { ...data, __Kentico_DC_Page: dcPageField.value },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response;
}

export async function DeleteRelations(
  leftNodeId: number,
  rightNodeId: number,
  relationshipNameId: number,
): Promise<IJsonResult> {
  //const formName = 'relationshipDeleteForm'
  const formName = formPartialName.replace('__', 'Delete');

  const formElement = window.document.getElementById(formName);
  if (!formElement) {
    console.error('Save failed. Form not found', formName);
    throw new Error(`Save failed. Form "${formName}" not found`);
  }
  const dcPageField: HTMLInputElement | undefined = formElement
    .getElementsByTagName('input')
    .namedItem('__Kentico_DC_Page') as HTMLInputElement;
  const formAction = formElement.getAttribute('action') as string;
  const data = {
    leftNodeId: leftNodeId,
    relationshipNameId: relationshipNameId,
    rightNodeId: rightNodeId,
  };
  const response = await axios.put(
    formAction,
    { ...data, __Kentico_DC_Page: dcPageField.value },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response;
}
