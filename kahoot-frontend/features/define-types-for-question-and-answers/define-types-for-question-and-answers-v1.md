## Goal
Define types for question and answers

## Description
define ts type for everything , define ts type for the object such that will have strong type safe question that represnt the objects in the prject 

## Tasks
- [ ] create one type.ts where all the type will be exported from there
- [ ] define question type in the format define in instruction section.



## Instruction
1. define type.ts in types folder in app.
2. move all types in that file.
3. define simple type for bigger type
4. remove code in quiz edit and create one componentin core called renderer

e.g:

Question should be 
{
    id,
    name:  : string (question name that will shows up in the left nav bar brefily)
    description?: string;
    points: number;
    calculationAlgorithm: CalculationAlgorithm;
    timeLimit: number;
    options: string[];
    imageUrl?: string;
    type: QuestionType;
    QuizeConfig : [
        {
            componentRef : input-field 
            props : {
                title : string
                /**
                componentProps make it any as of now
                **/
            }
        },
        {
            componentRef : image-url
            props : {
                imageUrl
            }
        }
        {
            componnentRef: mcq
            props : {
                options : [
                    {
                            componentRef : input-field 
                            props : {
                                title : string
                                 /**
                                 componentProps make it any as of now
                                 **/
                                 cssClass : "bg-red-200"
                            }
                    }
                ]
                isMultiAnsers : boolean (if true answers will be an array else will siglular value represne the index of the options , suppose its true)
                answers : [0,3]
            }
        }
    ]
}

QuizConfig represnt what ever inside the array


## Instruction
1. we will make middle (quiz edit empty as of now and wil start filling it  again ).
2. install angular cdk for drag and drop.
3. will create component called renderer in the core of the project.
4. plan and analyize and if u have question please ask me 


## Questions


## Answers
