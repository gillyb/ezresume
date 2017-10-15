import Promise from 'bluebird';
import reqwest from 'reqwest';

export default class ResumeDataGenerator {

    static get(section) {
        return new Promise((resolve, reject) => {
            reqwest({
                url: '/resume/new-section',
                method: 'POST',
                type: 'json',
                contentType: 'application/json',
                data: JSON.stringify({ type: section }),
                credentials: 'same-origin',
                success: (sectionData) => {
                    resolve(sectionData);
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    }

}