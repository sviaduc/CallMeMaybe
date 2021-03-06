package controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.PeopleDAO;
import entities.People;

@RestController 
public class PeopleController {
	
	@Autowired
	private PeopleDAO peopleDao;
	
	@RequestMapping(path="ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	
	
	//people
	@RequestMapping(path="people", method = RequestMethod.GET)
	public List<People> index(HttpServletResponse res){
		return peopleDao.index();
		
	}
	
	@RequestMapping(path="people/{id}", method = RequestMethod.GET)
	public People show(@PathVariable int id, HttpServletResponse res) {
		return peopleDao.show(id);
	}
	
	@RequestMapping(path="people", method = RequestMethod.POST)
	public People create(@RequestBody String peopleJSON, HttpServletResponse res) {
		People p = peopleDao.create(peopleJSON);
		if(p == null) {
			res.setStatus(401);
		}else {
			res.setStatus(201);
		}
		return p;
	}
	
	@RequestMapping(path="people/{id}", method = RequestMethod.PUT)
	public People update(@PathVariable int id,@RequestBody String peopleJSON, HttpServletResponse res) {
		System.out.println("**************");
		return peopleDao.update(id, peopleJSON);
	}
	
	@RequestMapping(path="people/{id}", method = RequestMethod.DELETE)
	public boolean destroy(@PathVariable int id, HttpServletResponse res) {	
		return peopleDao.destroy(id);	
	}
	
	@RequestMapping(path="people/{id}/update", method = RequestMethod.PUT)
	public boolean updateDate(@PathVariable int id, HttpServletResponse res, @RequestBody String dateJson) {	
		System.out.println(dateJson);
		System.out.println(id);
		return peopleDao.updateDate(id, dateJson);	
	}
	
	
}



	
	