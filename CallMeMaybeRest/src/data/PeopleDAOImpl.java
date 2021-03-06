package data;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.People;

@Transactional
@Repository
public class PeopleDAOImpl implements PeopleDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<People> index() {
		String query = "SELECT p FROM People p";
		return em.createQuery(query, People.class).getResultList();
	}

	@Override
	public People show(int id) {
		return em.find(People.class, id);

	}

	@Override
	public People create(String peopleJSON) {
		ObjectMapper mapper = new ObjectMapper();
		
		try {
		  People mappedPeople = mapper.readValue(peopleJSON, People.class);
		  em.persist(mappedPeople);
		  em.flush();
		  
		  return mappedPeople;
		} catch (Exception e) {
		  e.printStackTrace();
		}
		return null;
	}

	@Override
	public People update(int id, String peopleJSON) {
		ObjectMapper mapper = new ObjectMapper();
		  People mappedPeople = null;
		  try {
			  mappedPeople = mapper.readValue(peopleJSON, People.class);
		  }	catch(Exception e) {
			  e.printStackTrace();
		  }
		  People p = em.find(People.class, id);
		  p.setName(mappedPeople.getName());
		  p.setCallDate(mappedPeople.getCallDate());
		  p.setRelationship(mappedPeople.getRelationship());
		  p.setBirthday(mappedPeople.getBirthday());
			
		 return p;
	}

	@Override
	public boolean destroy(int id) {
		People p = em.find(People.class, id);
		try{
			em.remove(p);
			return true;
		}catch(Exception e) {
			e.printStackTrace();
			return false;
		}

	}
	
	@Override
	public boolean updateDate(int id, String dateJson) {
		ObjectMapper mapper = new ObjectMapper();
		  People mappedPeople = null;
		  try {
			  mappedPeople = mapper.readValue(dateJson, People.class);
			  People peeps = em.find(People.class, id);
			  String dateStart = peeps.getCallDate();
			  String dateStop = mappedPeople.getCallDate().substring(0,10);

				//HH converts hour in 24 hours format (0-23), day calculation
				SimpleDateFormat format = new SimpleDateFormat("yyyy-mm-dd");

				Date d1 = null;
				Date d2 = null;

				try {
					d1 = format.parse(dateStart);
					d2 = format.parse(dateStop);

					//in milliseconds
					long diff = d2.getTime() - d1.getTime();

					long diffDays = diff / (24 * 60 * 60 * 1000);

					System.out.print(diffDays + " days, ");
					//hit button = add 10 points
					//each diffDays = - 1 point
					

				} catch (Exception e) {
					e.printStackTrace();
				}
			  peeps.setCallDate(mappedPeople.getCallDate().substring(0,10));
			  em.merge(peeps);
			  em.flush();
			  return true;
		  }	catch(Exception e) {
			  e.printStackTrace();
		  }
		  
			
		 return false;
		
	}
	
}
	
