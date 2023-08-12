import Image from "next/image";

export const Courses = () => (
  <section className="p-6">
    <h1 className="text-center text-3xl font-bold mb-10">Courses</h1>
    <p className="text-center mb-10">
      Variety of choices in three different categories
    </p>
    <div className="grid grid-rows-1 sm:grid-cols-4 gap-4 ">
      <div className="bg-islamic flex flex-row items-center justify-center sm:block ">
        <Image
          className="sm:w-full hidden sm:block"
          src="/assets/islamic_column.webp"
          alt="girl with Hijab smiling and learning"
          width={200}
          height={200}
        />
        <div className="p-5 items-center sm:items-start">
          <h3 className="text-center text-2xl font-bold mb-10 h-8">
            Islamic Education
          </h3>
          <p className="text-center">
            Indirect internalization of Islamic beliefs through experiments and
            hands-on activities delivered by trained passionate teachers
          </p>
        </div>
      </div>
      <div className="bg-skills flex flex-row  items-center justify-center sm:block ">
        <Image
          className="sm:w-full hidden sm:block"
          src="/assets/life_skills_column.webp"
          alt="woman helping girl cook"
          width={200}
          height={200}
        />
        <div className="p-5 items-center sm:items-start">
          <h3 className="text-center text-2xl font-bold mb-10 h-8">
            Life Skills
          </h3>
          <p className="text-center">
            Clubs and courses in various categories, delivered by professional
            teachers
          </p>
        </div>
      </div>

      <div className="bg-sports flex flex-row items-center justify-center sm:block ">
        <Image
          className="sm:w-full hidden sm:block"
          src="/assets/sports_column.webp"
          alt="kid holding a football"
          width={200}
          height={200}
        />
        <div className="p-5 items-center ">
          <h3 className="text-center text-2xl font-bold mb-10 h-8">
            Sports Training
          </h3>
          <p className="text-center">
          A variety of sports training provided by qualified coaches 
            
          </p>
        </div>
      </div>

      <div className="bg-languages flex flex-row items-center justify-center sm:block ">
        <Image
          className="sm:w-full hidden sm:block"
          src="/assets/languages_column.webp"
          alt="chald board with words in different languages"
          width={200}
          height={200}
        />
        <div className="p-5 items-center sm:items-start">
          <h3 className="text-center text-2xl font-bold mb-10 h-8">
            Languages
          </h3>
          <p className="text-center">
            Language courses for children at different levels, taught by
            qualified teachers
          </p>
        </div>
      </div>
    </div>
  </section>
);
