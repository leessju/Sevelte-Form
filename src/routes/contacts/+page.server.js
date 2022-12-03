import { invalid, redirect } from "@sveltejs/kit"

let contacts = [
    { 
        id: 'dedjflajsdjfljdlfjalsdjfaf', 
        name: 'Alice',
        email:'nicejames@gmail.com',
        company: 'Good Company',
        job: 'Attorney'
    },
];

export const load = () => {
    return {
        contacts
    };
}

/* 액션이 2개이상일 경우는 default를 사용할 수 없다. */
export const actions = {
    create: async ({ request }) => {
      const formData = await request.formData();
      console.log(formData);
      
      const name = formData.get('name')
      const email = formData.get('email')
      const company = formData.get('company')
      const job = formData.get('job')
      
      if (name.length < 2) {
        // return {
        //     success: false
        //   }

        return invalid(400, {
          error: true,
          message: 'Name must be at least two characters.',
          name,
          email,
          company,
          job
        })
      }
  
      const id = crypto.randomUUID()
      const contact = {
        id,
        name,
        email,
        company,
        job
      }
  
        contacts.push(contact)
  
    //   throw redirect(303, '/')
  
      return {
        success: true,
      }
    },
    delete: async ({ request }) => {
        const formData = await request.formData()
        const id = formData.get('id')

        //console.log(id)
        
        contacts = contacts.filter(contact => contact.id != id)
    
        return {
          success: true,
        }
      }
  }