import Slider from "./Slider";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useData } from "../context/DataContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { useOutletContext } from "react-router-dom";

const Projects = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      offset: 100,
      delay: 100,
      once: false,
      mirror: true,
      easing: "ease-in-out",
      anchorPlacement: "top-bottom",
    });
  }, []);

  const [activeSlug, setActiveSlug] = useState(null);
  const [previousSlugs, setPreviousSlugs] = useState([]);
  const rowRef = useRef(null);
  const projectRefs = useRef({}); // ✅ store refs for scroll

  let { projectData } = useData();

  // ✅ Read slug from URL if present
  useEffect(() => {
    const pathSlug = window.location.pathname.split("/").pop();
    if (pathSlug) setActiveSlug(pathSlug);
  }, []);
  const selectedCategory = useOutletContext(); // ✅ Access context data

  // ✅ Filter projects by selected category
  if (selectedCategory.selectedCategory) {
    projectData = projectData.filter(project => {
      const categoryIds = project.category_id.toString().split(','); // convert to array
      return categoryIds.includes(selectedCategory.selectedCategory.toString());
    });
  }

  // ✅ Reset when category changes
  useEffect(() => {
    setActiveSlug(null);
    setPreviousSlugs([]);
  }, [selectedCategory]);

  // ✅ Scroll active project into view when selected
  useEffect(() => {
    if (activeSlug && projectRefs.current[activeSlug]) {
      const el = projectRefs.current[activeSlug];
      const rect = el.getBoundingClientRect();
      const isVisible =
        rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (!isVisible) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center", // 'center' or 'start'
        });
      }
    }
  }, [activeSlug]);

  const handleClick = (slug) => {
    if (slug !== activeSlug) {
      if (activeSlug && !previousSlugs.includes(activeSlug)) {
        setPreviousSlugs((prev) =>
          prev.includes(activeSlug) ? prev : [...prev, activeSlug]
        );
      }
    }

    setActiveSlug(slug);
    window.history.pushState({}, "", `/${slug}`);
    
  };

  return (
    <section className="projects pt-5">
      <div className="container-fluid">
        <AnimatePresence>
          <motion.div
            ref={rowRef}
            className="row relative"
            style={{ transformOrigin: "center center", overflow: "visible" }}
          >
            {projectData?.map((project, index) => {
              if (!project) return null;
              const {
                slug,
                id,
                project_name,
                project_address,
                project_thumbnail,
                project_main_image,
              } = project;

              const key =
                slug && slug.trim() ? slug : id ? `id-${id}` : `index-${index}`;
              const isActive = activeSlug === slug;
              const isPrevious = previousSlugs.includes(slug);

              // ✅ Assign ref for each project
              const setRef = (el) => {
                if (slug && el) projectRefs.current[slug] = el;
              };

              // 🟩 Active Project
              if (isActive) {
                return (
                  <motion.div
                    ref={setRef}
                    key={key}
                    initial={{ opacity: 0.8, scale: 1 }}
                    animate={{ opacity: 1, scale: 2.1 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="bg-green-200 rounded-lg relative z-20"
                    style={{ transformOrigin: "top center" }}
                  >
                    <div className="p-6">
                      <Slider
                        projectId={slug}
                        onClick={() => handleClick(slug)}
                        carouselMargin={380}
                        opacity={1}
                        fontSize={"8px"}
                        drag={"x"}
                      />
                    </div>
                  </motion.div>
                );
              }

              // 🟨 Previous Projects
              if (isPrevious) {
                return (
                  <motion.div
                    ref={setRef}
                    key={key}
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.4 }}
                    transition={{ duration: 0.5 }}
                    className="bg-yellow-200 rounded-lg relative z-10 cursor-pointer"
                    style={{ transformOrigin: "top top" }}
                    onClick={() => handleClick(slug)}
                  >
                    <div className="p-6">
                      <Slider
                        projectId={slug}
                        carouselMargin={140}
                        opacity={0}
                        fontSize={"12px"}
                        drag={"x"}
                      />
                    </div>
                  </motion.div>
                );
              }

              // 🟦 Default Projects
              return (
                <div
                  ref={setRef}
                  className="pb-4 project relative z-0 justify-content-center"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  key={key}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClick(slug)}
                >
                  <div className="smallImage">
                    <div className="project_box">
                      <img
                        src={`${import.meta.env.VITE_IMAGE_URL}/frontend/project-thumbnails/${project_thumbnail}`}
                        alt={project_name}
                      />
                      <h3>{project_name}</h3>
                      <p>{project_address}</p>
                    </div>
                  </div>
                  <div className="project_img">
                    <img
                      src={`${import.meta.env.VITE_IMAGE_URL}/frontend/project-images/${project_main_image}`}
                      alt={project_name}
                    />
                  </div>
                </div>
              );
            })}

            {/* Show message if no projects */}
            {projectData?.length === 0 && (
              <div className="col-12 text-center py-5 noProject">
                No projects found for this category.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
