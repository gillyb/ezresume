# ezresume
The easiest and quickest way to create a resume online



### Login flow
* User enters site
  * not logged in
    * Check local storage for resume
      * if exists, open it
      * else, generate random resume
          * save locally
  * logged in
    * find most recent edited resume
    * open it

* Saving the resume
  * If user is logged in
    * save with object id - create if needed (check permissions first)
  * anonymous
    * save locally