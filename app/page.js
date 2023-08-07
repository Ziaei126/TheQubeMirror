import Image from "next/image";
import RootLayout from "./layout";

export default function Home() {
  return (
    <RootLayout>
      <Hero />
      <Video />
      <Explanation />
      <Facets />
    </RootLayout>
  );
}

const Hero = () => (
  <section className="bg-cream flex justify-center min-h-min">
    <div className=" flex flex-col-reverse sm:flex-row p-6 items-center sm:items-start max-w-screen-lg">

      <article className="w-2/3 mt-5 sm:mt-0 items-center sm:items-start flex flex-col">
        <h1 className="text-4xl font-bold mb-4 flex-auto leading-relaxed text-center sm:text-left">
          Let's raise kids who <span className="text-orange">take pride </span>
          in their <span className="text-blue">Muslim identity</span>
        </h1>

        <button className="bg-orange text-white font-bold mt-5 sm:mt-10 py-2 px-4 rounded-full">
          Rergister now
        </button>
      </article>

      <Image
        src="/assets/kids8.webp"
        alt="Kids smiling"
        className=""
        width={1000}
        height={1000}
      />
    </div>
  </section>
);

const Video = () => (
  <section className="p-10">
    <div className="flex justify-center">
    <iframe src="https://player.vimeo.com/video/692728974?h=f5c5065b18" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

    </div>
  </section>
);

const Explanation = () => (
  <section className="bg-cream flex justify-center min-h-min blob">
    <div className="flex flex-col sm:flex-row p-6 items-center max-w-screen-lg">
      <Image
        src="/assets/pilot.webp"
        alt="Kids smiling"
        className="p-5 sm:w-1/2"
        width={1000}
        height={1000}
      />
      <article className="p-6 flex-row justify-center">
        <h1 className="text-4xl font-bold mb-4 flex-auto ">
          {" "}
          What's the Qube?{" "}
        </h1>
        <p>
          The Qube is a passion project born from a vision to build a lasting,
          self-sufficient community that inspires and empowers young Shia
          Muslims to explore their talents, develop their passions and nurture
          their sense of self.{" "}
        </p>

        <button className="bg-orange text-white font-bold mt-10 py-2 px-4 rounded-full ">
          Learn more
        </button>
      </article>
    </div>
    
  </section>
);

const Facets = () => (
  <section className="bg-cream min-h-min">
    <div className="flex flex-col items-center">
      <div className="flex flex-col sm:flex-row p-6 items-center max-w-screen-lg">
        <article className="p-6">
          <h1 className="text-4xl font-bold mb-4 flex-auto ">
            {" "}
            Six Facets of the Qube{" "}
          </h1>
          <p>
            Inspired by Islamic values, the Quran and the teaching of the
            Ahlulbayt, and modern educational methodology, our curriculum
            encompasses six core facets{" "}
          </p>
        </article>
        
        <svg
          className="w-1/2 sm:w-1/1"
          preserveAspectRatio="xMidYMid meet"
          data-bbox="35 33 130 134"
          viewBox="35 33 130 134"
          height="300"
          width="300"
          xmlns="http://www.w3.org/2000/svg"
          data-type="tint"
          role="presentation"
          aria-hidden="true"
        >
          <g>
            <path
              d="M66.9 120.9l2.5 4.1-12.7 7.8-2.5-4.1 12.7-7.8zm17.4-10.6l-10.7 6.5 2.5 4.1 10.9-6.7 7.1 1.8 1.2-4.6-6.3-1.6v-10h-4.8l.1 10.5zm46.9 14.8l12.4 3.1 1.2-4.6-12.4-3.1-1.2 4.6zM165 52.6v83L113.7 167 35 147.4v-83L86.3 33h.2L165 52.6zM84.3 93.2v-9.5L39.8 72.6v64.9l9.1-5.6 2.5 4.1-11.6 7.1v.6l71.1 17.7v-41.3l-10-2.5 1.2-4.6 8.9 2.2V90.3l-21.7-5.4v8.4l-5-.1zm28.6-7.4l47.3-29v-.6L89.1 38.6v9.3h-4.8v-8.1L39.8 67.1v.6l44.5 11.1v-1.6h4.8V80l23.8 5.8zm38.4 39.4l8.9 2.2V62.5l-44.5 27.2v26.6l10 2.5-1.2 4.6-8.9-2.2v38.9l44.5-27.2v-.6l-10-2.5 1.2-4.6zm-67-54.6h4.8V54.5h-4.8v16.1z"
              fill="#16262D"
            ></path>
          </g>
        </svg>
      </div>
      <hr className="w-4/5" />
      
      <Facet num="1" title="Community and Citizenship" description="The Qube is a safe space for children and parents to build relationships, and to give and receive support. Coming together as a community will create opportunities for all to network and lease with like-minded individuals and build the necessary skills to coexist with others whilst maintaining one’s individuality and boundaries."/>

      <Facet num="2"title="Spiritual and Religious Identity" description="Our Islamic etiquette, belief in our compassionate Creator and love towards our 14 Infallible heroes are rooted in our positive emotional attachment towards our religion. Our objective at the Qube is to develop a strong positive spiritual identity, which is cultivated in the personal connection that children feel toward the spiritual teachings, history and culture."/>

      <Facet num="3" title="Physical Health" description="The Qube provides planned regular sports activities for both parents and children accompanied with tournaments, qualifications and achievement awards to help families take control over their bodies through a conscious lifestyle that includes healthy eating, movement, and exercise."/>

      <Facet num="4" title="Mental & Emotional Wellness" description="At the Qube, we believe it is important to engage children in activities and conversations that help them to feel understood, loved, trusted, valued and safe. We value talking with children about their experiences, emotions, and fears and fostering strategies that build resilience."/>

      <Facet num="5" title="Essential Life Skills" description="Life is complex, distracting, fast-moving and stressful. Our children need specific skills to navigate this tricky terrain and thrive. At the Qube, we strive to develop our skills and abilities to achieve whilst not compromising on our standard values."/>

      <Facet num="6" title="Opportunity to Explore & be Curious" description="The Qube believes in providing the field to explore our abilities, challenge ourselves and make discoveries in a safe environment. We believe in respecting children and parents’ individuality and design our packages and syllabus with care to allow self-recognition, input, and variety of choice."/>

      




    </div>
  </section>
);

const Facet = ({title, description, num}) => (
  <div className="flex flex-col items-center justify-center sm:flex-row sm:items-end max-w-screen-md p-10">
        <Image
          src={`/assets/${num}.webp`}
          alt={num}
          className="max-w-[60px] h-auto"
          width={200}
          height={200}
        />
        <article className=" w-5/6 sm:ml-10">
          <h1 className=" mb-4 flex-auto text-center sm:text-left ">
            {" "}
            {title}{" "}
          </h1>
          <p>
            {description}{" "}
          </p>
        </article>
      </div>


)

