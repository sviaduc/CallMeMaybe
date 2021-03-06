package test;


import static org.junit.Assert.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.People;

public class PeopleTest {
	
	private EntityManagerFactory emf = null;
	private EntityManager em = null;
	
	@Before
	public void setUp() throws Exception {
		emf = Persistence.createEntityManagerFactory("CallMeMaybe");
		em = emf.createEntityManager();
	}
	
	@After
	public void tearDown() throws Exception {
	    em.close();
	    emf.close();
	}
	
	@Test
	public void test_call_mappings() {
	    People people = em.find(People.class, 1);
	    assertNotNull(people.getName());
	    assertEquals("Mom", people.getName());
	  }

}
