import React from 'react';
import ReactDOM from 'react-dom';
import InlineEdit from './inline-edit/InlineEdit';

ReactDOM.render(
    <InlineEdit value="this is a test"></InlineEdit>,
    document.getElementById('test-container')
);

// $(() => {
//
//     $('.editable').click(function() {
//         const element = $(this);
//         const elementPosition = element.position();
//         const elementWidth = element.outerWidth();
//         const elementHeight = element.outerHeight();
//
//         const editField = $('<input />');
//         editField.css({
//             position: 'absolute',
//             top: elementPosition.top + 'px',
//             left: elementPosition.left + 'px',
//             width: (elementWidth + 10) + 'px',
//             // height: elementHeight + 'px'
//             padding: '10px',
//             margin: '-11px'
//         });
//
//         editField.one('blur', (event) => {
//             alert('save!');
//             event.preventDefault();
//         });
//
//         editField.keypress((event) => {
//             if (event.which === 13) {       // user hit 'enter'
//                 alert('save');
//                 event.preventDefault();
//             }
//             else if (event.which === 27) {  // user hit 'esc'
//                 alert('not saved');
//                 event.preventDefault();
//             }
//         });
//
//         $('body').append(editField);
//         editField.focus();
//         editField.val(element.text());     // hack just to get the cursor at the end of the text in the input. (taken from here: https://stackoverflow.com/questions/4609405/set-focus-after-last-character-in-text-box)
//     });
//
// });